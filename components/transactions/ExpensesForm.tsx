import { mockUser } from '@/data/users';
import { createClient } from '@/utils/supabase/client';
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';

interface Props {
  transactionId: string;
}

export const ExpensesForm = ({ transactionId }: Props) => {
  const [amount, setAmount] = useState(0);
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [payee, setPayee] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNewExpense = async () => {
    const supabase = createClient();

    if (
      amount > 0 &&
      item.trim() &&
      description.trim() &&
      paymentType.trim() &&
      payee.trim()
    ) {
      setIsLoading(true);
      const { error } = await supabase.from('expenses').insert([
        {
          amount,
          item,
          description,
          paymentType,
          payee,
          transaction_id: transactionId,
          createdBy: mockUser, //TODO: replace with real user
        },
      ]);

      setIsLoading(false);

      if (error) {
        notifications.show({ message: 'Error adding data', color: 'red' });
        return;
      }

      notifications.show({
        message: 'Data added successfully',
        color: 'green',
      });
      setAmount(0);
      setItem('');
      setDescription('');
      setPaymentType('');
      setPayee('');
    }
  };

  return (
    <Card withBorder>
      <LoadingOverlay visible={isLoading} />
      <Title order={3} my="lg" c="dimmed">
        Expenses
      </Title>

      <NumberInput
        label="Amount"
        placeholder="Amount"
        withAsterisk
        defaultValue={0}
        min={0}
        value={amount}
        onChange={(value) => setAmount(Number(value))}
      />

      <TextInput
        label="Item"
        placeholder="Item this expense was used for"
        value={item}
        onChange={(e) => setItem(e.currentTarget.value)}
      />

      <Textarea
        label="Reason / Description"
        placeholder="What was the reason for this expense"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />

      <TextInput
        label="Payee"
        placeholder="Who received this payment"
        value={payee}
        onChange={(e) => setPayee(e.currentTarget.value)}
      />

      <Select
        label="Payment type"
        placeholder="payment type"
        data={['cash', 'momo']}
        value={paymentType}
        onChange={(value) => setPaymentType(value || '')}
      />

      <Group justify="flex-end">
        <Button onClick={handleAddNewExpense} color="gray" my="sm">
          Add Expense
        </Button>
      </Group>
    </Card>
  );
};
