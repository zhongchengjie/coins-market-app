import api from "../utils/axios";
import { CoinsResponse, SearchParams } from "../types";

// 获取加密货币列表
export async function getCoinsList(
  params: SearchParams = {}
): Promise<CoinsResponse> {
  try {
    const response = await api.get("/coins/list", { params });
    return response.data;
  } catch (error) {
    console.error("获取加密货币列表失败:", error);
    throw error;
  }
}