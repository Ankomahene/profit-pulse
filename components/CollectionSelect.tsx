import { useTransactions } from '@/context/TransactionsContextProvider';
import { useUrlSearchParams } from '@/hooks/use-update-url-search-params';
import { Select } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CollectionSelect = () => {
  const context = useTransactions();
  const updateParams = useUrlSearchParams();
  const searchParams = useSearchParams();
  const selectedTransactionId = searchParams.get('trans');

  const labels = context?.transactions.map((transaction) => ({
    label: transaction.name,
    value: `${transaction.id}`,
  }));

  const handleChange = (value: string | null) => {
    updateParams({ trans: value });
  };

  useEffect(() => {
    const sales = context?.sales || [];
    const expenses = context?.expenses || [];

    if (selectedTransactionId) {
      const filteredSales = sales.filter(
        (sale) => sale.transaction_id === selectedTransactionId
      );
      const filteredExpenses = expenses.filter(
        (expense) => expense.transaction_id === selectedTransactionId
      );

      context?.setFilteredSales(filteredSales);
      context?.setFilteredExpenses(filteredExpenses);
    } else {
      context?.setFilteredSales(sales);
      context?.setFilteredExpenses(expenses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTransactionId]);

  return (
    <Select
      size="xs"
      placeholder="Filter by transaction label"
      data={labels || []}
      value={selectedTransactionId}
      onChange={handleChange}
      searchable
      nothingFoundMessage="Nothing transactions found for date range"
    />
  );
};
