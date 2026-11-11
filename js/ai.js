async function callAI(messages) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });
  if (!r.ok) throw new Error("AI 服务出错：" + r.status);
  const data = await r.json();
  return data.reply || "（AI 无回复）";
}

function appendAIMsg(role, text) {
  const box = document.getElementById("ai-messages");
  const div = document.createElement("div");
  div.className = "ai-msg " + (role === "user" ? "user" : "bot");
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

const aiHistory = [];

async function sendAIMessage() {
  const input = document.getElementById("ai-input");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  appendAIMsg("user", text);
  aiHistory.push({ role: "user", content: text });
  appendAIMsg("bot", "思考中…");
  try {
    const reply = await callAI(aiHistory);
    document.getElementById("ai-messages").lastChild.textContent = reply;
    aiHistory.push({ role: "assistant", content: reply });
  } catch (e) {
    document.getElementById("ai-messages").lastChild.textContent = "⚠️ " + e.message;
  }
}

async function askAIForSyntaxExplain(code, errText) {
  const prompt = `学生运行了下面这段 Python 代码，出现了语法错误。请用中文、面向零基础，简明指出：1) 错误在第几行、什么语法错误；2) 应该怎么改。不要长篇大论，3~5句话。\n\n代码：\n${code}\n\n错误信息：\n${errText}`;
  try {
    return await callAI([{ role: "user", content: prompt }]);
  } catch (e) {
    return "（AI 讲解暂不可用：" + e.message + "）";
  }
}

async function explainCurrent() {
  const code = getCode();
  const errText = document.getElementById("error-popup").dataset.errText || "";
  const prompt = `请用中文面向零基础讲解下面代码（${errText ? "运行有语法错误，重点讲错误" : "整体讲解思路"}）：\n\n${code}\n\n${errText ? "错误信息：\n" + errText : ""}`;
  appendAIMsg("bot", "（讲解中…）");
  try {
    const reply = await callAI([{ role: "user", content: prompt }]);
    document.getElementById("ai-messages").lastChild.textContent = reply;
  } catch (e) {
    document.getElementById("ai-messages").lastChild.textContent = "⚠️ " + e.message;
  }
}

window.sendAIMessage = sendAIMessage;
window.askAIForSyntaxExplain = askAIForSyntaxExplain;
window.explainCurrent = explainCurrent;
