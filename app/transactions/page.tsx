import { AppLayout } from '@/components/AppLayout';
import { Transactions } from '@/components/transactions';
import { ExpensesForm } from '@/components/transactions/ExpensesForm';
import { SalesForm } from '@/components/transactions/SalesForm';
import { Button, Card, Divider, Group, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

const TransactionsPage = () => {
  return (
    <AppLayout>
      <Card bg="gray.1" withBorder>
        <Group justify="space-between">
          <Button leftSection={<IconPlus size="1rem" />}>
            Start new transaction
          </Button>

          <Button color="gray">Record previous transaction</Button>
        </Group>
      </Card>

      <Transactions />
    </AppLayout>
  );
};

export default TransactionsPage;
