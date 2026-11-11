async function judgeExercise(ex) {
  const code = getCode();
  const out = document.getElementById("output");
  for (let i = 0; i < ex.tests.length; i++) {
    const t = ex.tests[i];
    const res = await execute(code, t.input || "");
    const actual = (res.stdout || "").replace(/\r\n/g, "\n").trimEnd();
    const expected = (t.expected || "").replace(/\r\n/g, "\n").trimEnd();
    if (res.errorType === "SyntaxError" || res.stderr) {
      out.innerHTML = `<span class="err">❌ 用例 ${i+1} 运行出错：\n${escapeHtml(res.stderr)}</span>`;
      return false;
    }
    if (actual !== expected) {
      out.innerHTML = `<span class="err">❌ 用例 ${i+1} 未通过\n输入：${escapeHtml(t.input || "(无)")}\n期望输出：${escapeHtml(expected)}\n实际输出：${escapeHtml(actual)}</span>`;
      return false;
    }
  }
  out.innerHTML = `<span class="ok">✅ 全部 ${ex.tests.length} 个用例通过！</span>`;
  return true;
}
window.judgeExercise = judgeExercise;
