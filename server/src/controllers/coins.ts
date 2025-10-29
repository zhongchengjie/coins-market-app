import { Request, Response } from "express";
import { CoinService } from "../services/CoinService";
import {
  CoinsResponse,
  SortField,
  OrderType,
  ApiError,
  SingleCoinResponse,
} from "../types";

export class CoinsController {
  private coinService: CoinService;

  constructor() {
    this.coinService = new CoinService();
  }

  // 获取加密货币列表
  getCoinsList = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    try {
      const { list, total } = await this.coinService.queryCoins({
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
      const response: CoinsResponse = {
        success: true,
        data: list,
        total,
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

      const response: SingleCoinResponse = {
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
}
