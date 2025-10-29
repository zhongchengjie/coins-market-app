import React from 'react';
import {
  Card,
  Text,
  BlockStack,
  Box,
  Grid,
  EmptyState,
  Spinner,
  Banner,
} from '@shopify/polaris';
import { Coins } from '../../types';
import CardItem from './CardItem';

interface CoinsCardListProps {
  coinsData: Coins[];
  isLoading?: boolean;
  error?: string;
  onViewDetails?: (crypto: Coins) => void;
}

const CoinsCardList: React.FC<CoinsCardListProps> = ({
  coinsData,
  isLoading = false,
  error,
  onViewDetails,
}) => {
  if (error) {
    return (
      <Box padding="400">
        <Banner status="critical">
          <Text variant="bodyMd">
            加载数据时发生错误: {error}
          </Text>
        </Banner>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <Box padding="800">
          <BlockStack vertical spacing="loose" alignment="center">
            <Spinner size="large" />
            <Text variant="bodyMd" color="subdued">
              正在加载加密货币数据...
            </Text>
          </BlockStack>
        </Box>
      </Card>
    );
  }

  if (coinsData.length === 0) {
    return (
      <Card>
        <Box padding="800">
          <EmptyState
            heading="未找到加密货币"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <Text variant="bodyMd" color="subdued">
              请尝试调整搜索条件或刷新页面
            </Text>
          </EmptyState>
        </Box>
      </Card>
    );
  }

  return (
    <Box>
      <BlockStack vertical spacing="loose">
        {/* 结果统计 */}
        <Box paddingX="400">
          <Text variant="bodyMd" color="subdued">
            找到 {coinsData.length} 种加密货币
          </Text>
        </Box>

        {/* 加密货币网格 */}
        <Grid>
          {coinsData.map((item) => (
            <Grid.Cell 
              key={item.id} 
              columnSpan={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 3 }}
            >
              <CardItem
                coinItem={item}
                onViewDetails={onViewDetails}
              />
            </Grid.Cell>
          ))}
        </Grid>
      </BlockStack>
    </Box>
  );
};

export default CoinsCardList
