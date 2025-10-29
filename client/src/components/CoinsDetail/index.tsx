import React from 'react';
import {
  Card,
  Text,
  BlockStack,
  Box,
  Grid,
  Badge,
  Thumbnail,
  Spinner,
  Banner,
  Button,
} from '@shopify/polaris';
import { 
  MagicIcon, 
  ArrowLeftIcon 
} from '@shopify/polaris-icons';
import { Cryptocurrency } from '../../types';
import { usePriceFormatter } from '../../hooks/useCoins';

interface CryptocurrencyDetailProps {
  cryptocurrency: Cryptocurrency | null;
  isLoading?: boolean;
  error?: string;
  onBack?: () => void;
}

export const CryptocurrencyDetail: React.FC<CryptocurrencyDetailProps> = ({
  cryptocurrency,
  isLoading = false,
  error,
  onBack,
}) => {
  const { formatPrice, formatMarketCap, formatVolume, formatPercentage } = usePriceFormatter();

  if (error) {
    return (
      <Box padding="400">
        <Banner status="critical">
          <Text variant="bodyMd">
            加载详情时发生错误: {error}
          </Text>
        </Banner>
        {onBack && (
          <Box paddingTop="400">
            <Button onClick={onBack} icon={ArrowLeftIcon}>
              返回列表
            </Button>
          </Box>
        )}
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
              正在加载加密货币详情...
            </Text>
          </BlockStack>
        </Box>
      </Card>
    );
  }

  if (!cryptocurrency) {
    return (
      <Card>
        <Box padding="800">
          <BlockStack vertical spacing="loose" alignment="center">
            <Text variant="headingMd">
              未找到加密货币信息
            </Text>
            <Text variant="bodyMd" color="subdued">
              请检查ID是否正确
            </Text>
            {onBack && (
              <Button onClick={onBack} icon={ArrowLeftIcon}>
                返回列表
              </Button>
            )}
          </BlockStack>
        </Box>
      </Card>
    );
  }

  const isPositiveChange = (cryptocurrency.price_change_percentage_24h || 0) >= 0;
  const changeIcon = isPositiveChange ? MagicIcon : MagicIcon;
  const changeColor = isPositiveChange ? 'success' : 'critical';

  return (
    <Box>
      <BlockStack vertical spacing="loose">
        {/* 返回按钮 */}
        {onBack && (
          <Box>
            <Button onClick={onBack} icon={ArrowLeftIcon}>
              返回列表
            </Button>
          </Box>
        )}

        {/* 基本信息 */}
        <Card>
          <Box padding="400">
            <BlockStack vertical spacing="loose">
              <BlockStack distribution="equalSpacing" alignment="center">
                <BlockStack spacing="tight" alignment="center">
                  {cryptocurrency.image && (
                    <Thumbnail
                      source={cryptocurrency.image}
                      alt={cryptocurrency.name}
                      size="large"
                    />
                  )}
                  <BlockStack vertical spacing="extraTight">
                    <Text variant="headingLg" as="h1">
                      {cryptocurrency.name}
                    </Text>
                    <Text variant="bodyLg" color="subdued">
                      {cryptocurrency.symbol.toUpperCase()}
                    </Text>
                  </BlockStack>
                </BlockStack>
                
                <Badge status={changeColor} icon={changeIcon}>
                  {formatPercentage(cryptocurrency.price_change_percentage_24h || 0)}
                </Badge>
              </BlockStack>

              <Text variant="displayLarge" as="h2">
                {formatPrice(cryptocurrency.current_price)}
              </Text>
            </BlockStack>
          </Box>
        </Card>

        {/* 详细数据 */}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Card>
              <Box padding="400">
                <BlockStack vertical spacing="loose">
                  <Text variant="headingMd" as="h3">
                    市场数据
                  </Text>
                  
                  <BlockStack vertical spacing="tight">
                    <BlockStack distribution="equalSpacing">
                      <Text variant="bodyMd" color="subdued">市值</Text>
                      <Text variant="bodyMd">
                        {cryptocurrency.market_cap ? formatMarketCap(cryptocurrency.market_cap) : 'N/A'}
                      </Text>
                    </BlockStack>
                    
                    <BlockStack distribution="equalSpacing">
                      <Text variant="bodyMd" color="subdued">24h交易量</Text>
                      <Text variant="bodyMd">
                        {cryptocurrency.total_volume ? formatVolume(cryptocurrency.total_volume) : 'N/A'}
                      </Text>
                    </BlockStack>
                    
                    <BlockStack distribution="equalSpacing">
                      <Text variant="bodyMd" color="subdued">24h变化</Text>
                      <Text variant="bodyMd">
                        {formatPercentage(cryptocurrency.price_change_percentage_24h || 0)}
                      </Text>
                    </BlockStack>
                  </BlockStack>
                </BlockStack>
              </Box>
            </Card>
          </Grid.Cell>

          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Card>
              <Box padding="400">
                <BlockStack vertical spacing="loose">
                  <Text variant="headingMd" as="h3">
                    24小时价格区间
                  </Text>
                  
                  <BlockStack vertical spacing="tight">
                    <BlockStack distribution="equalSpacing">
                      <Text variant="bodyMd" color="subdued">最高价</Text>
                      <Text variant="bodyMd">
                        {cryptocurrency.high_24h ? formatPrice(cryptocurrency.high_24h) : 'N/A'}
                      </Text>
                    </BlockStack>
                    
                    <BlockStack distribution="equalSpacing">
                      <Text variant="bodyMd" color="subdued">最低价</Text>
                      <Text variant="bodyMd">
                        {cryptocurrency.low_24h ? formatPrice(cryptocurrency.low_24h) : 'N/A'}
                      </Text>
                    </BlockStack>
                    
                    <BlockStack distribution="equalSpacing">
                      <Text variant="bodyMd" color="subdued">当前价</Text>
                      <Text variant="bodyMd">
                        {formatPrice(cryptocurrency.current_price)}
                      </Text>
                    </BlockStack>
                  </BlockStack>
                </BlockStack>
              </Box>
            </Card>
          </Grid.Cell>
        </Grid>

        {/* 更新时间 */}
        <Box paddingX="400">
          <Text variant="bodySm" color="subdued">
            最后更新: {new Date(cryptocurrency.last_updated).toLocaleString('zh-CN')}
          </Text>
        </Box>
      </BlockStack>
    </Box>
  );
};
