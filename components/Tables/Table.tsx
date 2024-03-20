'use client';
import { IExpense, ISale } from '@/types';
import { Anchor, Card, Center, ScrollArea, Table, Text } from '@mantine/core';

interface Props {
  data: ISale[] | IExpense[];
}

export function TableLayout({ data }: Props) {
  if (data.length === 0) {
    return (
      <Card withBorder h={200}>
        <Center h="100%">
          <Text c="dimmed" size="sm">
            No data available to display
          </Text>
        </Center>
      </Card>
    );
  }

  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>{new Date(row.created_at).toLocaleDateString()}</Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm" title={row.description}>
            {row.item}
          </Anchor>
        </Table.Td>
        <Table.Td>{row.amount.toFixed(2)}</Table.Td>
        <Table.Td>{row.createdBy.name}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea h={500}>
      <Table.ScrollContainer minWidth={400}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Item</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Created By</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </ScrollArea>
  );
}
