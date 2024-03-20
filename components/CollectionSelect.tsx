import React from 'react';
import { Select } from '@mantine/core';
import { useAppContext } from '@/app/ContextProvider';

export const CollectionSelect = () => {
  const context = useAppContext();
  const labels = context?.state.transactions.map((transaction) => ({
    label: transaction.name,
    value: `${transaction.id}`,
  }));

  return (
    <Select
      size="xs"
      placeholder="Filter by transaction label"
      data={labels || []}
      searchable
      nothingFoundMessage="Nothing transactions found for date range"
    />
  );
};
