import React, { useState, useCallback } from "react";
import { useQueryClient } from "react-query";
import { Box, DataTable, Button, InlineStack, Icon, Text, useBreakpoints, Toast } from "@shopify/polaris";
import { StarIcon, StarFilledIcon } from "@shopify/polaris-icons";
import { addFavoriteCoin, removeFavoriteCoin } from "../../apis/coins";
import FallbackThumbnail from "../FallbackThumbnail";
import { Coins, SortField, OrderType } from "../../types";
import usePriceFormatter from "../../hooks/usePriceFormatter";
import "./coins_table.css";

interface CoinsTableProps {
  coinsData: Coins[];
  onSortChange: (field: SortField, order: OrderType) => void;
}

const CoinsTable: React.FC<CoinsTableProps> = ({ coinsData, onSortChange }) => {
  const { formatPrice, formatMarketCap, formatVolume, formatPercentage } = usePriceFormatter();
  const { lgDown } = useBreakpoints();
  const fixedColumns = lgDown ? 3 : 0;
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [toastConfig, setToastConfig] = useState({ content: "", duration: 2000, error: false });
  const queryClient = useQueryClient();

  // toast显示/隐藏
  const toggleToast = useCallback(() => setActiveToast((active) => !active), []);

  // toast
  const toastMarkup = activeToast ? <Toast onDismiss={toggleToast} {...toastConfig} /> : null;

  // 收藏/取消收藏
  const handleFavoriteClick = async (symbol: string, is_favorited: boolean = false) => {
    const res = !is_favorited ? await addFavoriteCoin(symbol) : await removeFavoriteCoin(symbol);
    if (res.success) {
      setToastConfig({
        ...toastConfig,
        content: !is_favorited ? "已收藏" : "已取消收藏",
        error: false,
      });
    } else {
      setToastConfig({
        ...toastConfig,
        content: !is_favorited ? "收藏失败" : "取消收藏失败",
        error: true,
      });
    }
    setActiveToast(true);
    queryClient.invalidateQueries("coins_query");
  };

  // 表头
  const coinsColumns = [
    <Icon source={StarIcon} tone="base" />,
    <Text alignment="center" as="p" fontWeight="semibold">
      排名
    </Text>,
    <Text alignment="start" as="p" fontWeight="semibold">
      货币名称
    </Text>,
    <Text alignment="end" as="p" fontWeight="semibold">
      价格
    </Text>,
    <Text alignment="end" as="p" fontWeight="semibold">
      最低价(24H)
    </Text>,
    <Text alignment="end" as="p" fontWeight="semibold">
      最高价(24H)
    </Text>,
    <Text alignment="end" as="p" fontWeight="semibold">
      涨跌(24H)
    </Text>,
    <Text alignment="end" as="p" fontWeight="semibold">
      市值
    </Text>,
    <Text alignment="end" as="p" fontWeight="semibold">
      交易量(24H)
    </Text>,
  ];

  // 表格数据
  const coinsDataRows = coinsData.map((item: Coins) => [
    <Button
      variant="plain"
      icon={<Icon source={item.is_favorited ? StarFilledIcon : StarIcon} tone="base" />}
      onClick={() => handleFavoriteClick(item.symbol, item.is_favorited)}
    ></Button>,
    <Text alignment="center" as="p">
      {item.id}
    </Text>,
    <InlineStack align="start" blockAlign="center" gap="300" wrap={false}>
      <FallbackThumbnail src={`${location.protocol}//${location.host}/images/${item.image}`} alt={item.name} size="extraSmall" />
      <Box>
        <div className="custom-text-blue">
          <Text variant="bodyLg" as="p" fontWeight="bold">
            {item.name}
          </Text>
        </div>
        <div className="custom-text-gray">
          <Text variant="bodyXs" as="p">
            {item.symbol}
          </Text>
        </div>
      </Box>
    </InlineStack>,
    <div className="custom-text-blue">
      <Text variant="bodyLg" as="p">
        {formatPrice(item.current_price)}
      </Text>
    </div>,
    <div className="custom-text-green">
      <Text variant="bodyLg" as="p">
        {formatPrice(item.low_24h)}
      </Text>
    </div>,
    <div className="custom-text-red">
      <Text variant="bodyLg" as="p">
        {formatPrice(item.high_24h)}
      </Text>
    </div>,
    <div className={item.price_change_percentage_24h > 0 ? "custom-text-red" : "custom-text-green"}>
      <Text variant="bodyLg" as="p">
        {formatPercentage(item.price_change_percentage_24h || 0)}
      </Text>
    </div>,
    <Text variant="bodyLg" as="p">
      {item.market_cap ? formatMarketCap(item.market_cap) : "N/A"}
    </Text>,
    <Text variant="bodyLg" as="p">
      {item.total_volume ? formatVolume(item.total_volume) : "N/A"}
    </Text>,
  ]);

  const sortFields: SortField[] = ["symbol", "current_price", "market_cap", "total_volume", "change", "high_24h", "low_24h"];
  // 排序
  const handleSort = (index: number, direction: "ascending" | "descending") => {
    // console.log('handleSort index...', index)
    onSortChange(sortFields[index - 1], direction === "ascending" ? "asc" : "desc");
  };

  return (
    <Box padding={{ xs: "100", sm: "100", md: "400", lg: "400", xl: "400" }}>
      <DataTable
        verticalAlign="middle"
        columnContentTypes={["text", "text", "text", "numeric", "numeric", "numeric", "numeric", "numeric", "numeric"]}
        headings={coinsColumns}
        sortable={[false, false, true, true, true, true, true, true, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={6}
        rows={coinsDataRows}
        footerContent={`Showing ${coinsDataRows.length} of ${coinsDataRows.length} results`}
        onSort={handleSort}
        fixedFirstColumns={fixedColumns}
      />
      {toastMarkup}
    </Box>
  );
};

export default CoinsTable;
