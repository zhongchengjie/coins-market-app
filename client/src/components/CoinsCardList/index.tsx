import React from 'react';
import {
  Box,
  Grid,
} from '@shopify/polaris';
import { Coins } from '../../types';
import CardItem from './CardItem';

interface CoinsCardListProps {
  coinsData: Coins[];
}

const CoinsCardList: React.FC<CoinsCardListProps> = ({
  coinsData,
}) => {
 

  return (
    <Box>
      <Grid>
        {coinsData.map((item: Coins) => (
          <Grid.Cell 
            key={item.id} 
            columnSpan={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 3 }}
          >
            <CardItem
              coinItem={item}
            />
          </Grid.Cell>
        ))}
      </Grid>
    </Box>
  );
};

export default CoinsCardList
