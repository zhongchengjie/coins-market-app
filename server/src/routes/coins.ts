import { Router } from 'express';
import { CoinsController } from '../controllers/coins';

const router = Router();
const coinsController = new CoinsController();

// 获取加密货币列表
router.get('/list', coinsController.getCoinsList);

// 根据ID获取加密货币
router.get('/:id', coinsController.getCoinDetailById);

export default router;
