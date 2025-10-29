import { Coins } from "../types";

export class MockDataService {
  private mockCoinsData: Coins[] = [];

  constructor() {
    this.initializeMockCoinsData();
  }

  private initializeMockCoinsData(): void {
    this.mockCoinsData = [
      {
        id: 1,
        symbol: "BTC",
        name: "比特币",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 61234.5,
        market_cap: 1210000000000,
        total_volume: 32800000000,
        price_change_percentage_24h: 1.56,
        high_24h: 61500.0,
        low_24h: 60890.1,
        last_updated: new Date(),
      },
      {
        id: 2,
        symbol: "ETH",
        name: "以太坊",
        image:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: 2987.64,
        market_cap: 361200000000,
        total_volume: 18500000000,
        price_change_percentage_24h: -0.83,
        high_24h: 3020.0,
        low_24h: 2950.5,
        last_updated: new Date(),
      },
      {
        id: 3,
        symbol: "BNB",
        name: "BNB",
        image:
          "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
        current_price: 515.2,
        market_cap: 78900000000,
        total_volume: 2100000000,
        price_change_percentage_24h: 0.45,
        high_24h: 520.0,
        low_24h: 510.5,
        last_updated: new Date(),
      },
      {
        id: 4,
        symbol: "XRP",
        name: "瑞波币",
        image:
          "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
        current_price: 0.532,
        market_cap: 29300000000,
        total_volume: 1200000000,
        price_change_percentage_24h: -1.2,
        high_24h: 0.538,
        low_24h: 0.529,
        last_updated: new Date(),
      },
      {
        id: 5,
        symbol: "ADA",
        name: "卡尔达诺",
        image:
          "https://assets.coingecko.com/coins/images/975/large/cardano.png",
        current_price: 0.451,
        market_cap: 16000000000,
        total_volume: 600000000,
        price_change_percentage_24h: 2.1,
        high_24h: 0.455,
        low_24h: 0.442,
        last_updated: new Date(),
      },
      {
        id: 6,
        symbol: "DOGE",
        name: "狗狗币",
        image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
        current_price: 0.124,
        market_cap: 18000000000,
        total_volume: 1100000000,
        price_change_percentage_24h: 4.5,
        high_24h: 0.126,
        low_24h: 0.119,
        last_updated: new Date(),
      },
      {
        id: 7,
        symbol: "SOL",
        name: "Solana",
        image:
          "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        current_price: 152.75,
        market_cap: 68500000000,
        total_volume: 3800000000,
        price_change_percentage_24h: 5.8,
        high_24h: 154.2,
        low_24h: 148.9,
        last_updated: new Date(),
      },
      {
        id: 8,
        symbol: "DOT",
        name: "波卡",
        image:
          "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
        current_price: 6.98,
        market_cap: 9100000000,
        total_volume: 400000000,
        price_change_percentage_24h: -0.7,
        high_24h: 7.05,
        low_24h: 6.92,
        last_updated: new Date(),
      },
      {
        id: 9,
        symbol: "AVAX",
        name: "Avalanche",
        image: "https://assets.coingecko.com/coins/images/12559/large/avax.png",
        current_price: 35.21,
        market_cap: 13900000000,
        total_volume: 700000000,
        price_change_percentage_24h: 1.9,
        high_24h: 35.8,
        low_24h: 34.7,
        last_updated: new Date(),
      },
      {
        id: 10,
        symbol: "LINK",
        name: "Chainlink",
        image:
          "https://assets.coingecko.com/coins/images/877/large/chainlink.png",
        current_price: 14.32,
        market_cap: 8400000000,
        total_volume: 500000000,
        price_change_percentage_24h: -1.3,
        high_24h: 14.5,
        low_24h: 14.1,
        last_updated: new Date(),
      },
      {
        id: 11,
        symbol: "LTC",
        name: "莱特币",
        image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
        current_price: 81.45,
        market_cap: 6100000000,
        total_volume: 400000000,
        price_change_percentage_24h: 0.2,
        high_24h: 82.1,
        low_24h: 80.9,
        last_updated: new Date(),
      },
      {
        id: 12,
        symbol: "BCH",
        name: "比特币现金",
        image:
          "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png",
        current_price: 425.6,
        market_cap: 8400000000,
        total_volume: 300000000,
        price_change_percentage_24h: -0.5,
        high_24h: 428.0,
        low_24h: 423.5,
        last_updated: new Date(),
      },
      {
        id: 13,
        symbol: "XLM",
        name: "恒星币",
        image:
          "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png",
        current_price: 0.115,
        market_cap: 3300000000,
        total_volume: 100000000,
        price_change_percentage_24h: 0.8,
        high_24h: 0.116,
        low_24h: 0.114,
        last_updated: new Date(),
      },
      {
        id: 14,
        symbol: "ATOM",
        name: "Cosmos",
        image:
          "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png",
        current_price: 8.76,
        market_cap: 3400000000,
        total_volume: 200000000,
        price_change_percentage_24h: 1.1,
        high_24h: 8.8,
        low_24h: 8.65,
        last_updated: new Date(),
      },
      {
        id: 15,
        symbol: "ETC",
        name: "以太经典",
        image:
          "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png",
        current_price: 26.34,
        market_cap: 3900000000,
        total_volume: 200000000,
        price_change_percentage_24h: -2.1,
        high_24h: 26.8,
        low_24h: 26.2,
        last_updated: new Date(),
      },
      {
        id: 16,
        symbol: "XMR",
        name: "门罗币",
        image:
          "https://assets.coingecko.com/coins/images/69/large/monero_logo.png",
        current_price: 170.25,
        market_cap: 3100000000,
        total_volume: 70000000,
        price_change_percentage_24h: 0.5,
        high_24h: 171.0,
        low_24h: 169.5,
        last_updated: new Date(),
      },
      {
        id: 17,
        symbol: "ALGO",
        name: "Algorand",
        image: "https://assets.coingecko.com/coins/images/4380/large/algo.png",
        current_price: 0.182,
        market_cap: 1500000000,
        total_volume: 60000000,
        price_change_percentage_24h: 3.2,
        high_24h: 0.184,
        low_24h: 0.178,
        last_updated: new Date(),
      },
      {
        id: 18,
        symbol: "FIL",
        name: "Filecoin",
        image:
          "https://assets.coingecko.com/coins/images/12817/large/filecoin.png",
        current_price: 5.92,
        market_cap: 3200000000,
        total_volume: 300000000,
        price_change_percentage_24h: -1.8,
        high_24h: 6.05,
        low_24h: 5.88,
        last_updated: new Date(),
      },
      {
        id: 19,
        symbol: "EOS",
        name: "EOS",
        image:
          "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png",
        current_price: 0.82,
        market_cap: 960000000,
        total_volume: 100000000,
        price_change_percentage_24h: 0.0,
        high_24h: 0.825,
        low_24h: 0.815,
        last_updated: new Date(),
      },
      {
        id: 20,
        symbol: "AAVE",
        name: "Aave",
        image: "https://assets.coingecko.com/coins/images/12645/large/aave.png",
        current_price: 102.5,
        market_cap: 1500000000,
        total_volume: 100000000,
        price_change_percentage_24h: 2.5,
        high_24h: 103.8,
        low_24h: 101.2,
        last_updated: new Date(),
      },
      {
        id: 21,
        symbol: "MKR",
        name: "Maker",
        image: "https://assets.coingecko.com/coins/images/1364/large/maker.png",
        current_price: 2850.0,
        market_cap: 2700000000,
        total_volume: 80000000,
        price_change_percentage_24h: -0.9,
        high_24h: 2875.0,
        low_24h: 2830.0,
        last_updated: new Date(),
      },
      {
        id: 22,
        symbol: "COMP",
        name: "Compound",
        image: "https://assets.coingecko.com/coins/images/10775/large/COMP.png",
        current_price: 65.4,
        market_cap: 520000000,
        total_volume: 40000000,
        price_change_percentage_24h: 1.3,
        high_24h: 66.1,
        low_24h: 64.8,
        last_updated: new Date(),
      },
      {
        id: 23,
        symbol: "YFI",
        name: "yearn.finance",
        image:
          "https://assets.coingecko.com/coins/images/11849/large/yfi-192x192.png",
        current_price: 8650.0,
        market_cap: 290000000,
        total_volume: 30000000,
        price_change_percentage_24h: -2.1,
        high_24h: 8800.0,
        low_24h: 8600.0,
        last_updated: new Date(),
      },
      {
        id: 24,
        symbol: "ZEC",
        name: "Zcash",
        image: "https://assets.coingecko.com/coins/images/486/large/zcash.png",
        current_price: 22.85,
        market_cap: 370000000,
        total_volume: 50000000,
        price_change_percentage_24h: 0.7,
        high_24h: 23.0,
        low_24h: 22.7,
        last_updated: new Date(),
      },
      {
        id: 25,
        symbol: "DASH",
        name: "Dash",
        image:
          "https://assets.coingecko.com/coins/images/19/large/dash-logo.png",
        current_price: 29.91,
        market_cap: 350000000,
        total_volume: 50000000,
        price_change_percentage_24h: -0.4,
        high_24h: 30.2,
        low_24h: 29.8,
        last_updated: new Date(),
      },
      {
        id: 26,
        symbol: "NEAR",
        name: "NEAR Protocol",
        image: "https://assets.coingecko.com/coins/images/10365/large/near.jpg",
        current_price: 3.45,
        market_cap: 3700000000,
        total_volume: 200000000,
        price_change_percentage_24h: 4.2,
        high_24h: 3.48,
        low_24h: 3.38,
        last_updated: new Date(),
      },
      {
        id: 27,
        symbol: "GRT",
        name: "The Graph",
        image:
          "https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png",
        current_price: 0.185,
        market_cap: 1800000000,
        total_volume: 80000000,
        price_change_percentage_24h: 1.6,
        high_24h: 0.187,
        low_24h: 0.182,
        last_updated: new Date(),
      },
      {
        id: 28,
        symbol: "SNX",
        name: "Synthetix",
        image: "https://assets.coingecko.com/coins/images/3406/large/SNX.png",
        current_price: 2.45,
        market_cap: 790000000,
        total_volume: 40000000,
        price_change_percentage_24h: -1.2,
        high_24h: 2.48,
        low_24h: 2.43,
        last_updated: new Date(),
      },
      {
        id: 29,
        symbol: "RUNE",
        name: "THORChain",
        image: "https://assets.coingecko.com/coins/images/6595/large/RUNE.png",
        current_price: 5.2,
        market_cap: 1700000000,
        total_volume: 100000000,
        price_change_percentage_24h: 3.8,
        high_24h: 5.25,
        low_24h: 5.1,
        last_updated: new Date(),
      },
      {
        id: 30,
        symbol: "KSM",
        name: "Kusama",
        image:
          "https://assets.coingecko.com/coins/images/9568/large/kusama.png",
        current_price: 35.8,
        market_cap: 310000000,
        total_volume: 20000000,
        price_change_percentage_24h: -0.8,
        high_24h: 36.1,
        low_24h: 35.6,
        last_updated: new Date(),
      },
    ];
  }

  getAllMockCoinsData(): Coins[] {
    return [...this.mockCoinsData];
  }

  // 模拟价格更新
  updatePrices(): void {
    this.mockCoinsData.forEach((item) => {
      // 生成随机价格变化 (-5% 到 +5%)
      const changePercent = (Math.random() - 0.5) * 10;
      const changeFactor = 1 + changePercent / 100;

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
        item.total_volume *= 0.8 + Math.random() * 0.4; // 随机变化
      }
    });
  }
}
