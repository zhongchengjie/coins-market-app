import api from "../utils/axios";
import { CoinsResponse, SearchParams, ApiSuccess } from "../types";

// 获取加密货币列表
export async function getCoinsList(params: SearchParams = {}): Promise<CoinsResponse> {
  const response = await api.get("/coins/list", { params });
  return response.data;
}

// 收藏加密货币
export async function addFavoriteCoin(symbol: string): Promise<ApiSuccess> {
  const response = await api.post("/coins/favorite/add", { symbol });
  return response.data;
}

// 取消收藏加密货币
export async function removeFavoriteCoin(symbol: string): Promise<ApiSuccess> {
  const response = await api.post("/coins/favorite/cancel", { symbol });
  return response.data;
}
