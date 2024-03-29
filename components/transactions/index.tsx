'use client';
import { Button, Card, Container, Divider, Group, Stack } from '@mantine/core';
import React, { useState } from 'react';
import { ExpensesForm } from './ExpensesForm';
import { SalesForm } from './SalesForm';
import { TransactionLabel } from './TransactionLabel';
import { IconPlus } from '@tabler/icons-react';
import { createClient } from '@/utils/supabase/client';
import { ITransaction } from '@/types';
import { useLocalStorage } from '@mantine/hooks';
import { mockUser } from '@/data/users';
import { notifications } from '@mantine/notifications';

export const Transactions = () => {
  const [isStarting, setIsStarting] = useState(false);
  const [newTransaction, setNewTransaction] =
    useLocalStorage<ITransaction | null>({
      key: 'new_trans_profit_puls',
      defaultValue: null,
    });

  const handleStartNewTransaction = async () => {
    const supabase = createClient();

    setIsStarting(true);
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          name: 'Untitled transaction',
          createdBy: mockUser, //TODO: replace with real user
        },
      ])
      .select();
    setIsStarting(false);

    if (error) {
      notifications.show({
        message: 'Failed to Start a new transaction. Try again!',
        color: 'red',
      });
      return;
    }

    setNewTransaction(data[0]);
  };

  return (
    <Container fluid>
      <Card bg="gray.1" withBorder>
        <Group justify="space-between">
          <Button
            onClick={handleStartNewTransaction}
            leftSection={<IconPlus size="1rem" />}
            disabled={isStarting}
          >
            {isStarting ? 'Starting...' : 'Start new transaction'}
          </Button>

          <Button color="gray">Record previous transaction</Button>
        </Group>
      </Card>

      {newTransaction && (
        <>
          <TransactionLabel
            transaction={newTransaction}
            updateTransactionState={setNewTransaction}
          />
          <Divider />
          <Group grow my="xl" align="flex-start" visibleFrom="md">
            <SalesForm transactionId={`${newTransaction.id}`} />
            <ExpensesForm transactionId={`${newTransaction.id}`} />
          </Group>

          <Stack my="xl" hiddenFrom="md">
            <SalesForm transactionId={`${newTransaction.id}`} />
            <ExpensesForm transactionId={`${newTransaction.id}`} />
          </Stack>
        </>
      )}
    </Container>
  );
};
