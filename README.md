# Python 学习平台

面向零基础的 Python 交互学习网页，含课程目录、进度、练习题自动判题、AI 助教、本地/在线双模式执行。

## 一、本地运行（自己用）

1. 安装 Python（勾选 Add Python to PATH）。
2. 双击 `local-bridge/start.bat` 启动本地执行器（保持窗口开启）。
3. 双击 `index.html` 用浏览器打开，状态灯显示 🟢 即使用本机真 Python。
4. 若未启动本地执行器，自动使用浏览器内 Pyodide 在线执行。

## 二、部署到 Vercel（分享给别人）

1. 把项目上传到 GitHub 仓库。
2. Vercel 导入该仓库并 Deploy。
3. 在 Vercel 项目 Settings -> Environment Variables 添加：
   - `DEEPSEEK_API_KEY` = 你的 DeepSeek Key（https://platform.deepseek.com）
4. Redeploy 后访问分配的域名即可。

## 三、目录结构

- `index.html` 主页面
- `css/style.css` 样式
- `js/` 课程、进度、编辑器、执行、判题、AI、主逻辑
- `api/chat.js` Vercel Serverless：DeepSeek 代理
- `local-bridge/` 本地真 Python 执行器

## 四、扩展课程

编辑 `js/courses.js`，按现有结构增删章节与练习题（`tests` 为输入输出测试用例）。
