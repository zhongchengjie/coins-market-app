#!/bin/bash

echo "🚀 加密货币实时行情应用程序"
echo "================================"

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js版本过低，需要18+，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js版本检查通过: $(node -v)"

# 检查Docker
if command -v docker &> /dev/null; then
    echo "✅ Docker已安装"
    DOCKER_AVAILABLE=true
else
    echo "⚠️  Docker未安装，将使用本地开发模式"
    DOCKER_AVAILABLE=false
fi

# 安装依赖
echo ""
echo "📦 安装项目依赖..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"

# 选择启动方式
echo ""
echo "请选择启动方式:"
echo "1) 本地开发模式 (推荐)"
echo "2) Docker容器模式"

if [ "$DOCKER_AVAILABLE" = true ]; then
    read -p "请输入选择 (1-2): " choice
else
    echo "Docker不可用，将使用本地开发模式"
    choice=1
fi

case $choice in
    1)
        echo ""
        echo "🚀 启动本地开发服务器..."
        echo "前端: http://localhost:3000"
        echo "后端: http://localhost:3001"
        echo ""
        echo "按 Ctrl+C 停止服务器"
        npm run dev
        ;;
    2)
        if [ "$DOCKER_AVAILABLE" = true ]; then
            echo ""
            echo "🐳 构建并启动Docker容器..."
            npm run docker:build
            npm run docker:up
            echo ""
            echo "✅ 应用已启动"
            echo "访问地址: http://localhost"
            echo ""
            echo "停止服务: npm run docker:down"
        else
            echo "❌ Docker不可用，请先安装Docker"
            exit 1
        fi
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac
