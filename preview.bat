@echo off
chcp 65001 >nul
echo 正在启动学术主页本地预览...
python preview.py
if %errorlevel% neq 0 (
    echo.
    echo 未检测到 python 命令，尝试直接启动默认浏览器...
    start http://localhost:8000
    python -m http.server 8000
)
pause
