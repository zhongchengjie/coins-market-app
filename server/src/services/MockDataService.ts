import { Coins } from '../types';

export class MockDataService {
  private mockCoinsData: Coins[] = [];

  constructor() {
    this.initializeMockCoinsData();
  }

  private initializeMockCoinsData(): void {
    this.mockCoinsData = [
      {
        id: 1,
        symbol: 'BTC',
        name: '比特币',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: 112334.6,
        market_cap: 2250000000000,
        total_volume: 62880000000,
        price_change_percentage_24h: 2.34,
        high_24h: 112336.9,
        low_24h: 112312.1,
        last_updated: new Date()
      },
      {
        id: 2,
        symbol: '以太坊',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        current_price: 3989.64,
        market_cap: 481160000000,
        total_volume: 36620000000,
        price_change_percentage_24h: -3.08,
        high_24h: 3998.64,
        low_24h: 3967.01,
        last_updated: new Date(),
      },
      {
        id: 3,
        symbol: 'BNB',
        name: 'BNB',
        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
        current_price: 315.20,
        market_cap: 48500000000,
        total_volume: 1200000000,
        price_change_percentage_24h: -0.75,
        high_24h: 325.00,
        low_24h: 310.00,
        last_updated: new Date()
      },
      {
        id: 4,
        symbol: 'ADA',
        name: 'Cardano',
        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
        current_price: 0.485,
        market_cap: 17100000000,
        total_volume: 450000000,
        price_change_percentage_24h: 3.25,
        high_24h: 0.495,
        low_24h: 0.465,
        last_updated: new Date()
      },
      {
        id: 5,
        symbol: 'SOL',
        name: 'Solana',
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
        current_price: 98.50,
        market_cap: 42500000000,
        total_volume: 2100000000,
        price_change_percentage_24h: 5.15,
        high_24h: 102.00,
        low_24h: 92.00,
        last_updated: new Date()
      },
      {
        id: 6,
        symbol: 'XRP',
        name: 'XRP',
        image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
        current_price: 0.625,
        market_cap: 33800000000,
        total_volume: 1800000000,
        price_change_percentage_24h: -1.25,
        high_24h: 0.645,
        low_24h: 0.615,
        last_updated: new Date(),
      },
      {
        id: 7,
        symbol: 'DOT',
        name: 'Polkadot',
        image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
        current_price: 7.25,
        market_cap: 9500000000,
        total_volume: 280000000,
        price_change_percentage_24h: 2.85,
        high_24h: 7.45,
        low_24h: 6.95,
        last_updated: new Date(),
      },
      {
        id: 8,
        symbol: 'DOGE',
        name: 'Dogecoin',
        image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
        current_price: 0.085,
        market_cap: 12100000000,
        total_volume: 650000000,
        price_change_percentage_24h: 4.25,
        high_24h: 0.088,
        low_24h: 0.081,
        last_updated: new Date(),
      },
      {
        id: 9,
        symbol: 'AVAX',
        name: 'Avalanche',
        image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
        current_price: 38.75,
        market_cap: 14500000000,
        total_volume: 420000000,
        price_change_percentage_24h: 1.95,
        high_24h: 39.50,
        low_24h: 37.20,
        last_updated: new Date(),
      },
      {
        id: 10,
        symbol: 'MATIC',
        name: 'Polygon',
        image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
        current_price: 0.925,
        market_cap: 8500000000,
        total_volume: 320000000,
        price_change_percentage_24h: -0.45,
        high_24h: 0.935,
        low_24h: 0.915,
        last_updated: new Date(),
      }
    ];
  }
  
  getAllMockCoinsData(): Coins[] {
    return [...this.mockCoinsData];
  }
 
  // 模拟价格更新
  updatePrices(): void {
    this.mockCoinsData.forEach(item => {
      // 生成随机价格变化 (-5% 到 +5%)
      const changePercent = (Math.random() - 0.5) * 10;
      const changeFactor = 1 + (changePercent / 100);
      
      item.current_price *= changeFactor;
      item.price_change_percentage_24h = changePercent;
      item.last_updated = new Date();
      
      // 更新24小时高低价
      if (item.high_24h && item.current_price > item.high_24h) {
        item.high_24h = item.current_price;
      }
      if (item.low_24h && item.current_price < item.low_24h) {
        item.low_24h = item.current_price;
      }
      
      // 更新市值和交易量
      if (item.market_cap) {
        item.market_cap *= changeFactor;
      }
      if (item.total_volume) {
        item.total_volume *= (0.8 + Math.random() * 0.4); // 随机变化
      }
    });
  }
}
