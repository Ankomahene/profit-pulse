import { useTransactions } from '@/context/TransactionsContextProvider';
import { Card, Divider, Group, Input, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { TableLayout } from './Table';
import { TransactionItems } from './TransactionItems';

export const ExpensesTable = () => {
  const context = useTransactions();

  return (
    <TransactionItems
      label="Expenses"
      items={context?.filteredExpenses || []}
    />
  );
};
