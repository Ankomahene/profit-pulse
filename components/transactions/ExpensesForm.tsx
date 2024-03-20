import {
  Button,
  Card,
  Group,
  NumberInput,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import React from 'react';

export const ExpensesForm = () => {
  return (
    <Card withBorder>
      <Title order={3} my="lg" c="dimmed">
        Expenses
      </Title>

      <NumberInput
        label="Amount"
        placeholder="Amount"
        withAsterisk
        defaultValue={0}
        min={0}
      />

      <Textarea
        label="Reason"
        placeholder="What was the reason for this expense"
      />

      <TextInput label="Payee" placeholder="Who received this payment" />

      <Group justify="flex-end">
        <Button color="gray" my="sm">
          Add Expense
        </Button>
      </Group>
    </Card>
  );
};
