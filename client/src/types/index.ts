export interface Coins {
  id: number;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  last_updated: string;
  is_favorited?: boolean; // 是否被当前user_browser_id收藏
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

export interface ApiSuccess {
  success: true;
  message: string;
  data?: any;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

export type SortField = "symbol" | "current_price" | "market_cap" | "total_volume" | "change" | "high_24h" | "low_24h";
export type OrderType = "asc" | "desc";

export interface SearchParams {
  qs?: string;
  page?: number;
  limit?: number;
  sort?: SortField;
  order?: OrderType;
}
