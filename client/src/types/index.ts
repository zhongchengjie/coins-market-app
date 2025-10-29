export interface Coins {
  id: number;
  symbol: string;
  name: string;
  image?: string;
  current_price: number;
  market_cap?: number;
  total_volume?: number;
  price_change_percentage_24h?: number;
  high_24h?: number;
  low_24h?: number;
  last_updated: string;
}

export interface CoinsResponse {
  success: boolean;
  data: Coins[];
  total: number;
  page: number;
  limit: number;
}

export interface SingleCoinResponse {
  success: boolean;
  data: Coins;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

export interface SearchParams {
  qs?: string;
  page?: number;
  limit?: number;
}
