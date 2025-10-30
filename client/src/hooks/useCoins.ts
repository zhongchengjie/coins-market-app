import { useQuery } from 'react-query';
import { getCoinsList } from '../apis/coins';
import { SearchParams } from '../types';

// 获取加密货币列表的Hook
export const useGetCoinsList = (params: SearchParams = {}) => {
  return useQuery(
    ['coins', params],
    () => getCoinsList(params),
    {
      refetchInterval: 30000, // 每30秒刷新一次
      staleTime: 25000, // 25秒内数据被认为是新鲜的
      cacheTime: 5 * 60 * 1000, // 缓存5分钟
    }
  );
};