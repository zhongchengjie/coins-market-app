import { Router } from 'express';
import { CoinsController } from '../controllers/coins';

const router = Router();
const coinsController = new CoinsController();

// 获取加密货币列表
router.get('/list', coinsController.getCoinsList);

// 根据ID获取加密货币
router.get('/:id', coinsController.getCoinDetailById);

// 收藏加密货币
router.post('/favorite/add', coinsController.addFavoriteCoin);

// 取消收藏加密货币
router.post('/favorite/cancel', coinsController.removeFavoriteCoin);


export default router;
