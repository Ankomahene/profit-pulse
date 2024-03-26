import React, { useEffect, useState } from 'react';
import { TableLayout } from './Table';
import { Card, Divider, Group, Input, Text, Title } from '@mantine/core';
import { useTransactions } from '@/context/TransactionsContextProvider';
import { IconSearch } from '@tabler/icons-react';
import { IExpense, ISale } from '@/types';
import { calculateTotalAmount } from '@/functions/calc';

interface Props {
  label: string;
  items: ISale[] | IExpense[];
}

export const TransactionItems = ({ label, items }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedItems, setSearchedItems] = useState<ISale[] | IExpense[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      setSearchedItems(
        items.filter(
          (item) =>
            item.description.toLowerCase().includes(term) ||
            item.item.toLowerCase().includes(term) ||
            item.paymentType?.toLowerCase().includes(term)
        ) || []
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [items, searchTerm]);

  return (
    <Card withBorder>
      <Group justify="space-between" mb="lg">
        <Title order={4}>{label}</Title>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          size="xs"
          rightSection={<IconSearch size="1rem" />}
        />
      </Group>
      <Text c="dimmed" size="sm" fs="italic" mb="md">
        {searchTerm.trim() && searchedItems.length > 0
          ? `Found ${
              searchedItems.length
            } items, Total amount: ${calculateTotalAmount(searchedItems)}`
          : undefined}
      </Text>
      <Divider />
      <TableLayout
        data={
          searchedItems.length !== 0
            ? searchedItems
            : searchTerm.trim()
            ? []
            : items || []
        }
      />
    </Card>
  );
};
