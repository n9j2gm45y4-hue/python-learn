let pyodide = null;
let pyodideReady = false;
let localBridgeOnline = false;
const LOCAL_BRIDGE_URL = "http://127.0.0.1:5000";

async function detectLocalBridge() {
  try {
    const r = await fetch(LOCAL_BRIDGE_URL + "/ping", { signal: AbortSignal.timeout(1500) });
    localBridgeOnline = r.ok;
  } catch { localBridgeOnline = false; }
  updateModeIndicator();
}
function updateModeIndicator() {
  const el = document.getElementById("mode-indicator");
  if (localBridgeOnline) {
    el.className = "mode online";
    el.textContent = "🟢 本地 Python 已连接（真环境）";
  } else {
    el.className = "mode offline";
    el.textContent = "🟡 在线模式（Pyodide，未连接本地 Python）";
  }
}

async function ensurePyodide() {
  if (pyodideReady) return;
  document.getElementById("output").textContent = "正在加载浏览器内 Python（首次约10秒）…";
  pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/" });
  pyodideReady = true;
}

async function execute(code, stdinText) {
  if (localBridgeOnline) {
    try {
      const r = await fetch(LOCAL_BRIDGE_URL + "/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, stdin: stdinText || "" })
      });
      const data = await r.json();
      return { stdout: data.stdout || "", stderr: data.stderr || "", errorType: data.errorType || null };
    } catch (e) {
      localBridgeOnline = false;
      updateModeIndicator();
    }
  }
  await ensurePyodide();
  const stdinLines = (stdinText || "").split("\n");
  pyodide.globals.set("__stdin_lines", stdinLines);
  pyodide.runPython(`
import sys
class _FakeIn:
    def __init__(self):
        self.idx = 0
    def readline(self):
        lines = __import__('builtins').__stdin_lines
        if self.idx < len(lines):
            v = lines[self.idx]
            self.idx += 1
            return v + "\\n"
        return ""
    def read(self):
        return self.readline()
sys.stdin = _FakeIn()
`);
  let stdout = "", stderr = "", errorType = null;
  pyodide.setStdout({ batched: (s) => { stdout += s + "\n"; } });
  pyodide.setStderr({ batched: (s) => { stderr += s + "\n"; } });
  try {
    await pyodide.runPythonAsync(code);
  } catch (e) {
    const msg = e.message || String(e);
    stderr += msg + "\n";
    if (/SyntaxError|IndentationError/.test(msg)) errorType = "SyntaxError";
  }
  pyodide.setStdout({});
  pyodide.setStderr({});
  return { stdout, stderr, errorType };
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function showOutput(stdout, stderr, errorType) {
  const out = document.getElementById("output");
  out.innerHTML = "";
  if (stdout) out.innerHTML += `<span class="ok">${escapeHtml(stdout)}</span>`;
  if (stderr) out.innerHTML += `<span class="err">${escapeHtml(stderr)}</span>`;
  if (!stdout && !stderr) out.textContent = "（无输出）";
  if (errorType === "SyntaxError") showSyntaxErrorPopup(stderr);
}

async function runCode() {
  const code = getCode();
  document.getElementById("output").textContent = "运行中…";
  const res = await execute(code, "");
  showOutput(res.stdout, res.stderr, res.errorType);
}

async function showSyntaxErrorPopup(errText) {
  const popup = document.getElementById("error-popup");
  document.getElementById("error-text").textContent = errText.trim();
  document.getElementById("error-ai-tip").textContent = "AI 正在讲解…";
  popup.dataset.errText = errText;
  popup.classList.remove("hidden");
  const tip = await askAIForSyntaxExplain(getCode(), errText);
  document.getElementById("error-ai-tip").textContent = tip;
}

window.detectLocalBridge = detectLocalBridge;
window.runCode = runCode;
window.execute = execute;
window.escapeHtml = escapeHtml;
