import React, { useState, useCallback } from 'react';
import {
  Page,
  Layout,
  BlockStack,
  Box,
  Banner,
  Frame,
  TopBar,
  Text,
} from '@shopify/polaris';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Cryptocurrency } from './types';
import { 
  useCryptocurrencies, 
  useMarketStats, 
  useRealTimePrices 
} from './hooks/useCoins';
import { SearchBar } from './components/SearchBar';
import { MarketStatsCard } from './components/MarketStatsCard';
import { CryptocurrencyList } from './components/CoinsCardList';
import { CryptocurrencyDetail } from './components/CoinsDetail';
import { SortField, SortOrder } from './types';

// 创建React Query客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('market_cap');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(null);

  // 使用自定义Hook获取数据
  const { 
    data: cryptocurrenciesData, 
    isLoading: isLoadingCryptos, 
    error: cryptosError 
  } = useCryptocurrencies({
    query: searchQuery,
    sort: sortField,
    order: sortOrder,
  });

  const { 
    data: marketStatsData, 
    isLoading: isLoadingStats, 
    error: statsError 
  } = useMarketStats();

  const { isConnected } = useRealTimePrices();

  // 搜索处理
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 排序处理
  const handleSortChange = useCallback((field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  }, []);

  // 查看详情处理
  const handleViewDetails = useCallback((crypto: Cryptocurrency) => {
    setSelectedCrypto(crypto);
  }, []);

  // 返回列表处理
  const handleBackToList = useCallback(() => {
    setSelectedCrypto(null);
  }, []);

  return (
    <Frame>
      <Page title="加密货币" subtitle="加密货币实时行情">
        <Layout>
          <Layout.Section>
            <Box padding="400">
              <BlockStack vertical spacing="loose">
                {/* 主要内容区域 */}
                {selectedCrypto ? (
                  <CryptocurrencyDetail
                    cryptocurrency={selectedCrypto}
                    onBack={handleBackToList}
                  />
                ) : (
                  <BlockStack vertical spacing="loose">
                    {/* 搜索栏 */}
                    <SearchBar
                      onSearch={handleSearch}
                      onSortChange={handleSortChange}
                      isLoading={isLoadingCryptos}
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />

                    {/* 加密货币列表 */}
                    <CryptocurrencyList
                      cryptocurrencies={cryptocurrenciesData?.data || []}
                      isLoading={isLoadingCryptos}
                      error={cryptosError?.message}
                      onViewDetails={handleViewDetails}
                    />
                  </BlockStack>
                )}
              </BlockStack>
            </Box>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
};

export default App;
