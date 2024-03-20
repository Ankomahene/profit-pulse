import {
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import React from 'react';

export const SalesForm = () => {
  return (
    <Card withBorder>
      <Title order={3} my="lg" c="dimmed">
        Sales
      </Title>

      <NumberInput
        label="Amount"
        placeholder="Amount"
        withAsterisk
        defaultValue={0}
        min={0}
      />
      <TextInput label="Item" placeholder="Item name" />
      <Textarea label="Description" placeholder="Description of item" />

      <Select
        label="Payment type"
        placeholder="payment type"
        data={['Cash', 'Momo']}
      />

      <Group justify="flex-end">
        <Button my="sm">Add Sales</Button>
      </Group>
    </Card>
  );
};
