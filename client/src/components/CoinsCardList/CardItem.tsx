import React from 'react';
import {
  Card,
  Text,
  BlockStack,
  Box,
  Badge,
  Thumbnail,
  Button,
} from '@shopify/polaris';
import { MagicIcon } from '@shopify/polaris-icons';
import { Coins } from '../../types';
import usePriceFormatter from '../../hooks/usePriceFormatter';

interface CardItemProps {
  coinItem: Coins;
  onViewDetails?: (crypto: Coins) => void;
}

const CardItem: React.FC<CardItemProps> = ({
  coinItem,
  onViewDetails,
}) => {
  const { formatPrice, formatMarketCap, formatVolume, formatPercentage } = usePriceFormatter();
  const isPositiveChange = (coinItem.price_change_percentage_24h || 0) >= 0;
  const changeIcon = isPositiveChange ? MagicIcon : MagicIcon;
  // const changeColor = isPositiveChange ? 'success' : 'critical';

  return (
    <Card>
      <Box padding="400">
        <BlockStack>
          {/* 头部信息 */}
          <BlockStack>
            <BlockStack>
              {coinItem.image && (
                <Thumbnail
                  source={coinItem.image}
                  alt={coinItem.name}
                  size="small"
                />
              )}
              <BlockStack>
                <Text variant="headingMd" as="h3">
                  {coinItem.name}
                </Text>
                <Text variant="bodySm" as="p">
                  {coinItem.symbol.toUpperCase()}
                </Text>
              </BlockStack>
            </BlockStack>
            
            <Badge icon={changeIcon}>
              {formatPercentage(coinItem.price_change_percentage_24h || 0)}
            </Badge>
          </BlockStack>

          {/* 价格信息 */}
          <BlockStack>
            <Text variant="headingLg" as="h2">
              {formatPrice(coinItem.current_price)}
            </Text>
            
            {coinItem.high_24h && coinItem.low_24h && (
              <Text variant="bodySm" as="p">
                24h: {formatPrice(coinItem.low_24h)} - {formatPrice(coinItem.high_24h)}
              </Text>
            )}
          </BlockStack>

          {/* 市场数据 */}
          <BlockStack>
            <BlockStack>
              <Text variant="bodySm" as="p">
                市值
              </Text>
              <Text variant="bodyMd" as="p">
                {coinItem.market_cap ? formatMarketCap(coinItem.market_cap) : 'N/A'}
              </Text>
            </BlockStack>
            
            <BlockStack>
              <Text variant="bodySm" as="p">
                24h交易量
              </Text>
              <Text variant="bodyMd" as="p">
                {coinItem.total_volume ? formatVolume(coinItem.total_volume) : 'N/A'}
              </Text>
            </BlockStack>
          </BlockStack>

          {/* 操作按钮 */}
          {onViewDetails && (
            <Box>
              <Button
                fullWidth
                onClick={() => onViewDetails(coinItem)}
              >
                查看详情
              </Button>
            </Box>
          )}
        </BlockStack>
      </Box>
    </Card>
  );
};

export default CardItem
