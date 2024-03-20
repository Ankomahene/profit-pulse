import React from 'react';
import { TableLayout } from './Table';
import { Card, Title } from '@mantine/core';
import { useAppContext } from '@/app/ContextProvider';

export const ExpensesTable = () => {
  const context = useAppContext();

  return (
    <Card withBorder>
      <Title order={3} mb="lg">
        Expenses
      </Title>
      <TableLayout data={context?.state.expenses || []} />
    </Card>
  );
};
