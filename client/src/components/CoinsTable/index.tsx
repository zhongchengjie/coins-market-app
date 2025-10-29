import React, { useCallback, useState } from "react";
import {
  Card,
  Text,
  BlockStack,
  Box,
  EmptyState,
  Spinner,
  Banner,
  DataTable,
  TableData,
  InlineStack,
  Thumbnail,
} from "@shopify/polaris";
import { Coins } from "../../types";
import usePriceFormatter from '../../hooks/usePriceFormatter';
import styles from './table.module.css';

interface CoinsTableProps {
  coinsData: Coins[];
  isLoading?: boolean;
  error?: string;
  onViewDetails?: (crypto: Coins) => void;
}

function sortCurrency(
  rows: TableData[][],
  index: number,
  direction: 'ascending' | 'descending',
): TableData[][] {
  return [...rows].sort((rowA, rowB) => {
    const amountA = parseFloat((rowA[index] || 0).toString().substring(1));
    const amountB = parseFloat((rowB[index] || 0).toString().substring(1));
    return direction === 'descending' ? amountB - amountA : amountA - amountB;
  });
}

const CoinsTable: React.FC<CoinsTableProps> = ({
  coinsData,
  isLoading = false,
  error,
  onViewDetails,
}) => {
  const { formatPrice, formatMarketCap, formatVolume, formatPercentage } = usePriceFormatter();
  const [sortedRows, setSortedRows] = useState<TableData[][] | null>(null);

  // 表头
  const coinsColumns = [
    {
      header: "#",
      width: "20px",
    },
    {
      header: "名称",
      width: "120px",
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
  const originCoinsDataRows = coinsData.map((item: any, index: number) => [
    <p className={styles.lh40}>{index + 1}</p>,
    <InlineStack align="start" blockAlign="center" gap="400">
      <Thumbnail source={item.image} alt={item.name} size="extraSmall" />
      <Box>
        <p className={styles.text_name}>{item.name}</p>
        <p className={styles.text_symbol}>{item.symbol}</p>
      </Box>
    </InlineStack>,
    <p className={styles.text_price}>{formatPrice(item.current_price)}</p>,
    <p className={styles.text_price}>{formatPrice(item.low_24h)}</p>,
    <p className={styles.text_price}>{formatPrice(item.high_24h)}</p>,
    <p className={`${styles.text_percent} ${item.price_change_percentage_24h > 0 ? styles.text_red : styles.text_green}` }>{formatPercentage(item.price_change_percentage_24h || 0)}</p>,
    <p className={styles.text_num}>{item.market_cap ? formatMarketCap(item.market_cap) : 'N/A'}</p>,
    <p className={styles.text_num}>{item.total_volume ? formatVolume(item.total_volume) : 'N/A'}</p>,
  ]);
  // 表格数据
  const coinsDataRows = sortedRows ? sortedRows : originCoinsDataRows;

  // 排序
  const handleSort = useCallback(
    (index: number, direction: 'ascending' | 'descending') =>
      setSortedRows(sortCurrency(coinsDataRows, index, direction)),
    [coinsDataRows],
  );

  return (
    <Box padding="400">
      <DataTable
        columnContentTypes={[
          "numeric",
          "text",
          "numeric",
          "numeric",
          "numeric",
          "numeric",
          "numeric",
          "numeric",
        ]}
        headings={coinsColumns.map((column) => column.header)}
        sortable={[false, true, true, true, true, true, true, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={6}
        rows={coinsDataRows}
        footerContent={`Showing ${coinsDataRows.length} of ${coinsDataRows.length} results`}
        onSort={handleSort}
      />
    </Box>
  );
};

export default CoinsTable;
