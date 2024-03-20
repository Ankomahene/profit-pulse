import React from 'react';
import { TableLayout } from './Table';
import { Card, Title } from '@mantine/core';
import { useAppContext } from '@/app/ContextProvider';

export const SalesTable = () => {
  const context = useAppContext();

  return (
    <Card withBorder>
      <Title order={3} mb="lg">
        Sales
      </Title>
      <TableLayout data={context?.state.sales || []} />
    </Card>
  );
};
