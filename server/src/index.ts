import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import coinRoutes from './routes/coins';
import { DataUpdateService } from './services/DataUpdateService';

const app = express();
const PORT = process.env.PORT || 3001;

// 安全中间件
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://assets.coingecko.com"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// CORS配置
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [''] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// 请求限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP每15分钟最多100个请求
  message: {
    success: false,
    error: 'RATE_LIMIT_EXCEEDED',
    message: '请求过于频繁，请稍后再试'
  }
});

app.use('/api/', limiter);

// 解析JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 静态资源
app.use(express.static(path.join(__dirname, '..', 'public')));

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API服务运行正常',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API路由
app.use('/api/coins', coinRoutes);

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: '请求的资源不存在'
  });
});

// 错误处理中间件
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('服务器错误:', error);
  
  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: '服务器内部错误'
  });
});

// 启动服务器
async function startServer() {
  
  // 初始化数据更新服务
  const dataUpdateService = new DataUpdateService();
  if (!process.env.UPDATE_INTERVAL_MINUTE) await dataUpdateService.initializeData();

  // 开始定期更新数据（每5分钟更新一次）
  dataUpdateService.startPeriodicUpdate(process.env.UPDATE_INTERVAL_MINUTE ? Number(process.env.UPDATE_INTERVAL_MINUTE) : 10);

  // 启动服务器
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在端口 ${PORT}`);
    console.log(`🏥 健康检查: http://localhost:${PORT}/health`);
  });
}

startServer();
