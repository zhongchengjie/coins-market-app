import { CoinService } from './CoinService';
import { MockDataService } from './MockDataService';

export class DataUpdateService {
  private coinService: CoinService;
  private mockDataService: MockDataService;
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.coinService = new CoinService();
    this.mockDataService = new MockDataService();
  }

  // 初始化数据
  async initializeData(): Promise<void> {
    try {
      console.log('🔄 正在初始化加密货币数据...');
      // 插入初始模拟数据
      const initialData = this.mockDataService.getAllMockCoinsData();
      await this.coinService.upsertCoins(initialData);
      console.log('✅ 加密货币数据初始化完成');
    } catch (error) {
      console.error('❌ 加密货币数据初始化失败:', error);
      throw error;
    }
  }

  // 开始定期更新数据
  startPeriodicUpdate(intervalMinutes: number = 5): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    console.log(`🔄 开始定期更新数据，间隔: ${intervalMinutes} 分钟`);
    // 立即执行一次更新
    this.updateAllPrices();
    // 设置定期更新
    this.updateInterval = setInterval(() => {
      this.updateAllPrices();
    }, intervalMinutes * 60 * 1000);
  }

  // 停止定期更新
  stopPeriodicUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log('🛑 定期数据更新已停止');
    }
  }

  // 更新所有价格
  private async updateAllPrices(): Promise<void> {
    try {
      console.log('🔄 正在更新加密货币价格...');
      // 生成新的价格数据
      this.mockDataService.updatePrices();
      const newMockData = this.mockDataService.getAllMockCoinsData();
      // 批量更新数据库
      await this.coinService.upsertCoins(newMockData);
      console.log(`✅ 成功更新 ${newMockData.length} 个加密货币的价格`);
    } catch (error) {
      console.error('❌ 价格更新失败:', error);
    }
  }
}
