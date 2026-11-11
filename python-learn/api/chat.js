export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    res.status(500).json({ reply: "服务器未配置 DEEPSEEK_API_KEY，请在 Vercel 环境变量中设置。" });
    return;
  }
  try {
    const { messages } = req.body || {};
    const sys = "你是一个面向零基础学生的 Python 助教，用简体中文回答，简洁准确，聚焦语法与基础概念。";
    const body = {
      model: "deepseek-chat",
      messages: [{ role: "system", content: sys }, ...(messages || [])],
      temperature: 0.3
    };
    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "（AI 无回复）";
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ reply: "AI 调用失败：" + e.message });
  }
}
