import api from "../utils/axios";
import { CoinsResponse, SearchParams } from "../types";

// 获取加密货币列表
export async function getCoinsList(params: SearchParams = {}): Promise<CoinsResponse> {
  const response = await api.get("/coins/list", { params });
  return response.data;
}
