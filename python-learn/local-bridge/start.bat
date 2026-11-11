@echo off
chcp 65001 >nul
cd /d %~dp0
echo 正在启动本地 Python 桥接服务...
py bridge.py
if errorlevel 1 (
  echo.
  echo 启动失败：请确认已安装 Python 并加入 PATH。
  echo 可尝试在命令行运行: py bridge.py
)
pause
