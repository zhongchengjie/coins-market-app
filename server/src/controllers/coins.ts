import { Request, Response } from "express";
import { CoinService } from "../services/CoinService";
import {
  Coins,
  CoinsResponse,
  SortField,
  OrderType,
  ApiSuccess,
  ApiError,
  CoinResponse,
} from "../types";

export class CoinsController {
  private coinService: CoinService;

  constructor() {
    this.coinService = new CoinService();
  }

  // 获取加密货币列表
  getCoinsList = async (req: Request, res: Response): Promise<void> => {
    const user_browser_id = req.headers["x-user-browser-id"];
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    try {
      // 先查询收藏的加密货币
      let favorite_coins: Coins[] = [];
      if (user_browser_id && typeof user_browser_id === "string") {
        favorite_coins = await this.coinService.getFavoriteCoins(user_browser_id);
        favorite_coins = favorite_coins.map((item: Coins) => {
          item.is_favorited = true;
          return item;
        });
      }

      // 再查询加密货币列表
      let { list } = await this.coinService.queryCoins({
        query: typeof req.query.qs === "string" ? req.query.qs.trim() : "",
        page,
        limit,
        sort:
          typeof req.query.sort === "string"
            ? (req.query.sort.trim() as SortField)
            : "market_cap",
        order:
          typeof req.query.order === "string"
            ? (req.query.order.trim() as OrderType)
            : "desc",
      });

      // list过滤重复(即收藏的)
      if (favorite_coins.length) {
        const symbols: string[] = favorite_coins.map((item: Coins) => item.symbol);
        list = list.filter((item: Coins) => !symbols.includes(item.symbol));
      }
      
      const response: CoinsResponse = {
        success: true,
        data: favorite_coins.concat(list),
        total: favorite_coins.length + list.length,
        page,
        limit,
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ApiError = {
        success: false,
        error: "INTERNAL_ERROR",
        message: "获取加密货币数据时发生错误",
      };

      res.status(500).json(errorResponse);
    }
  };

  // 根据ID获取加密货币
  getCoinDetailById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const coinId = parseInt(id);

      if (isNaN(coinId)) {
        const errorResponse: ApiError = {
          success: false,
          error: "INVALID_ID",
          message: "无效的加密货币ID",
        };
        res.status(400).json(errorResponse);
        return;
      }

      const coinData = await this.coinService.queryCoinById(coinId);

      if (!coinData) {
        const errorResponse: ApiError = {
          success: false,
          error: "NOT_FOUND",
          message: "未找到指定的加密货币",
        };
        res.status(404).json(errorResponse);
        return;
      }

      const response: CoinResponse = {
        success: true,
        data: coinData,
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ApiError = {
        success: false,
        error: "INTERNAL_ERROR",
        message: "获取加密货币数据时发生错误",
      };

      res.status(500).json(errorResponse);
    }
  };

  // 收藏加密货币
  addFavoriteCoin = async (req: Request, res: Response): Promise<void> => {
    const { symbol } = req.body;
    const user_browser_id = req.headers["x-user-browser-id"];

    if (!user_browser_id || typeof user_browser_id !== 'string') {
      const errorResponse: ApiError = {
        success: false,
        error: "INVALID_PARAM",
        message: "user_browser_id is invalid",
      };
      res.status(400).json(errorResponse);
      return;
    }

    if (!symbol || typeof symbol !== 'string') {
      const errorResponse: ApiError = {
        success: false,
        error: "INVALID_PARAM",
        message: "symbol is invalid",
      };
      res.status(400).json(errorResponse);
      return;
    }
    
    try {
      await this.coinService.addFavoriteCoin(user_browser_id, symbol);

      const response: ApiSuccess = {
        success: true,
        message: '已收藏'
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ApiError = {
        success: false,
        error: "INTERNAL_ERROR",
        message: "收藏加密货币失败",
      };

      res.status(500).json(errorResponse);
    }
  };

  // 收藏加密货币
  removeFavoriteCoin = async (req: Request, res: Response): Promise<void> => {
    const { symbol } = req.body;
    const user_browser_id = req.headers["x-user-browser-id"];

    if (!user_browser_id || typeof user_browser_id !== 'string') {
      const errorResponse: ApiError = {
        success: false,
        error: "INVALID_PARAM",
        message: "user_browser_id is invalid",
      };
      res.status(400).json(errorResponse);
      return;
    }

    if (!symbol || typeof symbol !== 'string') {
      const errorResponse: ApiError = {
        success: false,
        error: "INVALID_PARAM",
        message: "symbol is invalid",
      };
      res.status(400).json(errorResponse);
      return;
    }
    
    try {
      await this.coinService.removeFavoriteCoin(user_browser_id, symbol);

      const response: ApiSuccess = {
        success: true,
        message: '已取消收藏'
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ApiError = {
        success: false,
        error: "INTERNAL_ERROR",
        message: "取消收藏加密货币失败",
      };

      res.status(500).json(errorResponse);
    }
  };
}
