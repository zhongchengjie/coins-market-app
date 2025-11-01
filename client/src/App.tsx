import React, { useState, useCallback } from "react";
import { Frame, TopBar, Page, Layout, Card } from "@shopify/polaris";
import { SearchBar } from "./components/SearchBar";
import CoinsTable from "./components/CoinsTable";
import { useGetCoinsList } from "./hooks/useQueryCoins";
import { SortField, OrderType } from "./types";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("market_cap");
  const [sortOrder, setSortOrder] = useState<OrderType>("desc");
  const { data: coinsData, isLoading: isLoadingData } = useGetCoinsList({
    qs: searchQuery,
    sort: sortField,
    order: sortOrder,
  });

  // 搜索处理
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 排序处理
  const handleSortChange = useCallback((field: SortField, order: OrderType) => {
    setSortField(field);
    setSortOrder(order);
  }, []);

  // 查看详情处理
  /* const handleViewDetails = useCallback(() => {
  }, []); */

  // 顶部导航栏
  const topBarMarkup = <TopBar />;

  return (
    <Frame topBar={topBarMarkup}>
      <Page title="加密货币" subtitle="加密货币实时行情">
        <Layout>
          <Layout.Section>
            <Card roundedAbove="xs">
              <SearchBar isLoading={isLoadingData} onSearch={handleSearch} />
              <CoinsTable coinsData={coinsData?.data || []} onSortChange={handleSortChange} />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
};

export default App;
