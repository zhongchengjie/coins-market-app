# 🚀 加密货币实时行情应用程序

一个基于Web的现代化加密货币实时行情查询应用，提供实时价格、交易量等数据。

访问地址：[coins-market-app](https://coinsmarketapp-28217-7-1309545693.sh.run.tcloudbase.com/)

## 🏗️ 项目结构

```
coins-market-app/
├── server/                 # 后端API服务器
│   ├── src/
│   │   ├── controllers/     # 控制器
│   │   ├── services/        # 业务逻辑服务
│   │   ├── routes/          # 路由定义
│   │   └── types/           # TypeScript类型定义
│   ├── Dockerfile
│   └── package.json
├── client/                # 前端React应用
│   ├── src/
│   │   ├── components/      # React组件
│   │   ├── hooks/           # 自定义Hook
│   │   ├── apis/        # API服务
│   │   └── types/           # TypeScript类型定义
│   └── package.json
└── README.md
```

## 🛠️ 技术栈

### 后端技术
- **Node.js** + **Express** - Web框架
- **TypeScript** - 类型安全的JavaScript
- **Knex.js** - SQL查询构建器
- **Helmet** - 安全中间件
- **CORS** - 跨域资源共享
- **Rate Limiting** - API请求限制

### 前端技术
- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Shopify Polaris** - 现代化UI组件库
- **React Query** - 数据获取和缓存
- **Axios** - HTTP客户端
- **Vite** - 构建工具


## ✨ 核心功能

### 🔍 实时行情监控
- 实时加密货币价格数据
- 24小时价格变化趋势
- 市值和交易量统计
- 自动数据刷新（每30秒）

### 🔎 搜索功能
- 按币种名称搜索
- 按符号（Symbol）搜索

### 📱 响应式设计
- 桌面端优化
- 移动端适配
- 现代化UI界面

### 🎯 附加功能
- 排序

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Docker (可选)

### 本地开发

1. **克隆项目**
```bash
git clone <repository-url>
cd coins-market-app
```

2. **安装依赖**
```bash
npm run install:all
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
- 前端: http://localhost:3000
- 后端API: http://localhost:3001

### Docker部署

## 📚 API文档

### 基础URL
```
http://localhost:3001/api
```

### 主要端点

#### 获取加密货币列表
```http
GET /coins/list
```

**查询参数:**
- `query` - 搜索关键词
- `page` - 页码 (默认: 1)
- `limit` - 每页数量 (默认: 50)
- `sort` - 排序字段 (current_price|market_cap|total_volume|change)
- `order` - 排序顺序 (asc|desc)

#### 获取单个加密货币
```http
GET /coins/:id
```

#### 健康检查
```http
GET /health
```
## 📝 开发规范

### 代码风格
- ESLint + Prettier
- TypeScript严格模式
- 组件化架构
- 函数式编程

### Git提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

## 🙏 致谢

- [Shopify Polaris](https://polaris.shopify.com/) - UI组件库
- [React Query](https://tanstack.com/query) - 数据获取
- [Knex.js](https://knexjs.org/) - SQL查询构建器
- [Vite](https://vitejs.dev/) - 构建工具


⭐ 如果这个项目对您有帮助，请给它一个星标！
