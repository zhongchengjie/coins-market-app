# 🚀 加密货币实时行情应用程序

一个基于Web的现代化加密货币实时行情监控应用，提供实时价格数据、搜索功能和直观的用户界面。

## 📋 项目概述

本项目是一个全栈加密货币行情应用，支持数百名用户同时访问，提供实时市场数据监控、搜索功能和响应式设计。

## 🏗️ 项目结构

```
coins-market-app/
├── backend/                 # 后端API服务器
│   ├── src/
│   │   ├── controllers/     # 控制器
│   │   ├── services/        # 业务逻辑服务
│   │   ├── routes/          # 路由定义
│   │   ├── migrations/      # 数据库迁移
│   │   ├── seeds/           # 种子数据
│   │   └── types/           # TypeScript类型定义
│   ├── Dockerfile
│   └── package.json
├── frontend/                # 前端React应用
│   ├── src/
│   │   ├── components/      # React组件
│   │   ├── hooks/           # 自定义Hook
│   │   ├── services/        # API服务
│   │   └── types/           # TypeScript类型定义
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Docker编排配置
└── README.md
```

## 🛠️ 技术栈

### 后端技术
- **Node.js** + **Express** - Web框架
- **TypeScript** - 类型安全的JavaScript
- **Knex.js** - SQL查询构建器
- **SQLite** - 轻量级数据库
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

### 部署技术
- **Docker** - 容器化
- **Docker Compose** - 多容器编排
- **Nginx** - 反向代理和静态文件服务

## ✨ 核心功能

### 🔍 实时行情监控
- 实时加密货币价格数据
- 24小时价格变化趋势
- 市值和交易量统计
- 自动数据刷新（每30秒）

### 🔎 搜索功能
- 按币种名称搜索
- 按符号（Symbol）搜索
- 实时搜索结果
- 搜索历史记录

### 📊 市场概览
- 总市值统计
- 24小时交易量
- 上涨/下跌币种统计
- 市场健康指标

### 📱 响应式设计
- 桌面端优化
- 移动端适配
- 平板设备支持
- 现代化UI界面

### 🎯 附加功能
- 加密货币详情页面
- 价格历史图表
- 排序和筛选
- 实时连接状态指示

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
- API文档: http://localhost:3001/api/cryptocurrencies

### Docker部署

1. **构建并启动服务**
```bash
npm run docker:build
npm run docker:up
```

2. **访问应用**
- 应用地址: http://localhost
- API地址: http://localhost/api

3. **停止服务**
```bash
npm run docker:down
```

## 📚 API文档

### 基础URL
```
http://localhost:3001/api
```

### 主要端点

#### 获取加密货币列表
```http
GET /cryptocurrencies
```

**查询参数:**
- `query` - 搜索关键词
- `page` - 页码 (默认: 1)
- `limit` - 每页数量 (默认: 50)
- `sort` - 排序字段 (price|market_cap|total_volume|change)
- `order` - 排序顺序 (asc|desc)

#### 获取单个加密货币
```http
GET /cryptocurrencies/:id
GET /cryptocurrencies/symbol/:symbol
```

#### 搜索加密货币
```http
GET /cryptocurrencies/search?q=bitcoin
```

#### 获取市场统计
```http
GET /cryptocurrencies/stats
```

#### 健康检查
```http
GET /health
```

## 🔧 开发指南

### 后端开发

1. **数据库迁移**
```bash
cd backend
npm run migrate
```

2. **种子数据**
```bash
npm run seed
```

3. **开发模式**
```bash
npm run dev
```

### 前端开发

1. **开发模式**
```bash
cd frontend
npm run dev
```

2. **构建生产版本**
```bash
npm run build
```

## 🐳 Docker配置

### 服务说明
- **backend**: Express API服务器 (端口: 3001)
- **frontend**: React应用 + Nginx (端口: 80)

### 环境变量
```env
NODE_ENV=production
PORT=3001
DB_CLIENT=sqlite3
DB_FILENAME=./database.sqlite
```

## 📈 性能优化

### 后端优化
- API请求限制 (100请求/15分钟)
- 数据库连接池
- 响应压缩
- 安全头设置

### 前端优化
- React Query缓存策略
- 组件懒加载
- 图片优化
- Gzip压缩

## 🔒 安全特性

- Helmet安全头
- CORS配置
- 请求频率限制
- SQL注入防护
- XSS防护

## 🧪 测试

### 运行测试
```bash
# 后端测试
cd backend && npm test

# 前端测试
cd frontend && npm test
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

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Shopify Polaris](https://polaris.shopify.com/) - UI组件库
- [React Query](https://tanstack.com/query) - 数据获取
- [Knex.js](https://knexjs.org/) - SQL查询构建器
- [Vite](https://vitejs.dev/) - 构建工具

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 创建 [Issue](../../issues)
- 发送邮件至: your-email@example.com

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
