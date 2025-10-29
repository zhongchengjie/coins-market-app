@echo off
chcp 65001 >nul
echo 🚀 加密货币实时行情应用程序
echo ================================

REM 检查Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 请先安装Node.js 18+
    pause
    exit /b 1
)

echo ✅ Node.js已安装

REM 检查Docker
where docker >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ Docker已安装
    set DOCKER_AVAILABLE=true
) else (
    echo ⚠️  Docker未安装，将使用本地开发模式
    set DOCKER_AVAILABLE=false
)

echo.
echo 📦 安装项目依赖...
call npm run install:all

if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo ✅ 依赖安装完成

echo.
echo 请选择启动方式:
echo 1) 本地开发模式 (推荐)
echo 2) Docker容器模式

if "%DOCKER_AVAILABLE%"=="true" (
    set /p choice="请输入选择 (1-2): "
) else (
    echo Docker不可用，将使用本地开发模式
    set choice=1
)

if "%choice%"=="1" (
    echo.
    echo 🚀 启动本地开发服务器...
    echo 前端: http://localhost:3000
    echo 后端: http://localhost:3001
    echo.
    echo 按 Ctrl+C 停止服务器
    call npm run dev
) else if "%choice%"=="2" (
    if "%DOCKER_AVAILABLE%"=="true" (
        echo.
        echo 🐳 构建并启动Docker容器...
        call npm run docker:build
        call npm run docker:up
        echo.
        echo ✅ 应用已启动
        echo 访问地址: http://localhost
        echo.
        echo 停止服务: npm run docker:down
    ) else (
        echo ❌ Docker不可用，请先安装Docker
        pause
        exit /b 1
    )
) else (
    echo ❌ 无效选择
    pause
    exit /b 1
)

pause
