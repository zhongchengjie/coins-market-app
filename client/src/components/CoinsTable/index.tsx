import React from "react";
import { Box, DataTable, InlineStack, useBreakpoints } from "@shopify/polaris";
import FallbackThumbnail from "../FallbackThumbnail";
import { Coins, SortField, OrderType } from "../../types";
import usePriceFormatter from "../../hooks/usePriceFormatter";
import styles from "./table.module.css";
interface CoinsTableProps {
  coinsData: Coins[];
  onSortChange: (field: SortField, order: OrderType) => void;
}

const CoinsTable: React.FC<CoinsTableProps> = ({ coinsData, onSortChange }) => {
  const { formatPrice, formatMarketCap, formatVolume, formatPercentage } = usePriceFormatter();
  const { lgDown } = useBreakpoints();
  const fixedFirstColumns = lgDown ? 2 : 0;

  // 表头
  const coinsColumns = [
    {
      header: "排名",
      width: "60px",
    },
    {
      header: "名称",
      width: "100px",
    },
    {
      header: "价格",
      width: "80px",
    },
    {
      header: "最低价(24H)",
      width: "80px",
    },
    {
      header: "最高价(24H)",
      width: "80px",
    },
    {
      header: "涨跌(24H)",
      width: "80px",
    },
    {
      header: "市值",
      width: "120px",
    },
    {
      header: "交易量(24H)",
      width: "100px",
    },
  ];

  // 表格数据
  const coinsDataRows = coinsData.map((item: Coins, index: number) => [
    <p className={styles.text_no}>{index + 1}</p>,
    <InlineStack align="start" blockAlign="center" gap="300" wrap={false}>
      <FallbackThumbnail src={item.image} alt={item.name} size="extraSmall" />
      <Box>
        <p className={styles.text_name}>{item.name}</p>
        <p className={styles.text_symbol}>{item.symbol}</p>
      </Box>
    </InlineStack>,
    <p className={styles.text_price}>{formatPrice(item.current_price)}</p>,
    <p className={`${styles.text_price} ${styles.text_green}`}>{formatPrice(item.low_24h)}</p>,
    <p className={`${styles.text_price} ${styles.text_red}`}>{formatPrice(item.high_24h)}</p>,
    <p className={`${styles.text_percent} ${item.price_change_percentage_24h > 0 ? styles.text_red : styles.text_green}`}>
      {formatPercentage(item.price_change_percentage_24h || 0)}
    </p>,
    <p className={styles.text_num}>{item.market_cap ? formatMarketCap(item.market_cap) : "N/A"}</p>,
    <p className={styles.text_num}>{item.total_volume ? formatVolume(item.total_volume) : "N/A"}</p>,
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
        columnContentTypes={["numeric", "text", "numeric", "numeric", "numeric", "numeric", "numeric", "numeric"]}
        headings={coinsColumns.map((column) => column.header)}
        sortable={[false, true, true, true, true, true, true, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={6}
        rows={coinsDataRows}
        footerContent={`Showing ${coinsDataRows.length} of ${coinsDataRows.length} results`}
        onSort={handleSort}
        fixedFirstColumns={fixedFirstColumns}
      />
    </Box>
  );
};

export default CoinsTable;
