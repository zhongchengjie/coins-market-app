import React, { useState, useEffect, useCallback } from "react";
import { Frame, TopBar, Page, Layout, Card } from "@shopify/polaris";
import { SearchBar } from "./components/SearchBar";
import CoinsCardList from "./components/CoinsCardList";
import CoinsTable from "./components/CoinsTable/";
import { useGetCoinsList } from "./hooks/useCoins";
import { Coins } from "./types";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const {
    data: coinsData,
    isLoading: isLoadingCryptos,
    error: cryptosError,
  } = useGetCoinsList({
    qs: searchQuery,
  });

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 搜索处理
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 查看详情处理
  const handleViewDetails = useCallback((crypto: Coins) => {
    // setSelectedCrypto(crypto);
  }, []);

  // 顶部导航栏
  const topBarMarkup = <TopBar />;

  return (
    <Frame topBar={topBarMarkup}>
      <Page title="加密货币行情" subtitle="加密货币实时行情">
        <Layout>
          <Layout.Section>
            <Card>
              <SearchBar isLoading={isLoadingCryptos} onSearch={handleSearch} />
              {isMobile ? (
                <CoinsCardList
                  coinsData={coinsData?.data || []}
                  isLoading={isLoadingCryptos}
                  error={cryptosError?.message}
                  onViewDetails={handleViewDetails}
                />
              ) : (
                <CoinsTable
                  coinsData={coinsData?.data || []}
                  isLoading={isLoadingCryptos}
                  error={cryptosError?.message}
                  onViewDetails={handleViewDetails}
                />
              )}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
};

export default App;
