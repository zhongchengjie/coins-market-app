import { useQuery } from "react-query";
import { getCoinsList } from "../apis/coins";
import { SearchParams } from "../types";

// 获取加密货币列表的Hook
export const useGetCoinsList = (params: SearchParams = {}) => {
  return useQuery(["coins_query", params], () => getCoinsList(params), {
    refetchInterval: 1 * 60 * 1000, // 每分钟刷新一次
    staleTime: 1 * 60 * 1000, // 1分钟内数据被认为是新鲜的
    cacheTime: 8 * 60 * 1000, // 缓存8分钟
  });
};
