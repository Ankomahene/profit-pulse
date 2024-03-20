'use client';
import { useAppContext } from '@/app/ContextProvider';
import { expenses } from '@/data/expenses';
import { sales } from '@/data/sales';
import { transactions } from '@/data/transactions';
import {
  filterItemsByDateRange,
  getAllUniqueTransactionIds,
} from '@/functions/filter';
import { getDateRangeByPreset } from '@/functions/get-dates-range';
import { Button, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';

const DateRange = () => {
  const context = useAppContext();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSetStartDate = (date: Date | null) => {
    setStartDate(date);
    context?.setPreset(undefined);
  };

  const handleSetEndDate = (date: Date | null) => {
    setEndDate(date);
    context?.setPreset(undefined);
  };

  const handleApply = () => {
    if (startDate == null || endDate == null) return;

    const filteredSales = filterItemsByDateRange(sales, startDate, endDate);
    const filteredExpenses = filterItemsByDateRange(
      expenses,
      startDate,
      endDate
    );

    const transactionIds = getAllUniqueTransactionIds([
      ...filteredSales,
      ...filteredExpenses,
    ]);

    const filteredTransactions = transactions.filter((item) =>
      transactionIds.includes(item.id.toString())
    );

    context?.setSales(filteredSales);
    context?.setExpenses(filteredExpenses);
    context?.setTransactions(filteredTransactions);
  };

  useEffect(() => {
    if (context?.state.preset) {
      const { startDate, endDate } = getDateRangeByPreset(
        context?.state.preset
      );

      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
    }
  }, [context?.state.preset]);

  return (
    <Group align="flex-end" wrap="nowrap">
      <DateInput
        maw={150}
        value={startDate}
        onChange={handleSetStartDate}
        valueFormat="ddd, DD-MMM-YYYY"
        placeholder="Start date (DD-MMM-YYYY)"
        size="xs"
      />
      <DateInput
        maw={150}
        value={endDate}
        onChange={handleSetEndDate}
        valueFormat="ddd, DD-MMM-YYYY"
        placeholder="End date (DD-MMM-YYYY)"
        size="xs"
      />
      <Button
        miw={80}
        size="xs"
        opacity={startDate == null || endDate == null ? 0.5 : 1}
        color="gray"
        disabled={!startDate || !endDate}
        onClick={handleApply}
      >
        Apply
      </Button>
    </Group>
  );
};

export default DateRange;
