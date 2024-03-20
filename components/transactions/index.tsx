import { Button, Container, Divider, Group, Stack, Title } from '@mantine/core';
import React from 'react';
import { ExpensesForm } from './ExpensesForm';
import { SalesForm } from './SalesForm';

export const Transactions = () => {
  return (
    <Container>
      <Group justify="space-between" align="flex-end" mt="xl" mb="sm">
        <Title order={3} c="dimmed">
          Week 1
        </Title>

        <Button color="gray" variant="light" size="xs">
          Edit
        </Button>
      </Group>
      <Divider />
      <Group grow my="xl" align="flex-start" visibleFrom="md">
        <SalesForm />
        <ExpensesForm />
      </Group>

      <Stack my="xl" hiddenFrom="md">
        <SalesForm />
        <ExpensesForm />
      </Stack>
    </Container>
  );
};
