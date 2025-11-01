export interface Coins {
  id: number;
  symbol: string; // 代码
  name: string; // 名称
  image: string; // 图片
  current_price: number; // 价格
  market_cap: number; // 市值
  total_volume: number; // 交易量
  price_change_percentage_24h: number; // 涨跌
  high_24h: number; // 最高值
  low_24h: number; // 最低值
  last_updated: Date; // 最后更新时间
  is_favorited?: boolean // 是否被当前user_browser_id收藏
}

export interface FavoriteCoins {
  id: number;
  user_browser_id: string // 浏览器指纹
  symbol: string; // 代码
}

export interface CoinsQueryResult {
  list: Coins[];
  total?: number;
}

export interface CoinsResponse {
  success: boolean;
  data: Coins[];
  total: number;
  page: number;
  limit: number;
}

export interface CoinResponse {
  success: boolean;
  data: Coins;
}

export type SortField = "symbol" | "current_price" | "market_cap" | "total_volume" | "change" | "high_24h" | "low_24h";
export type OrderType = "asc" | "desc";

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: SortField,
  order?: OrderType
}

export interface ApiSuccess {
  success: true;
  message: string;
  data?: any
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}
