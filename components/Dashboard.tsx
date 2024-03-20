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
import { Card, Group, Stack } from '@mantine/core';
import { useEffect } from 'react';
import { BasicPresets } from './BasicPresets';
import { CollectionSelect } from './CollectionSelect';
import DateRange from './DateRange';
import { PieChart } from './PieChart';
import { PresetsSelect } from './PresetsSelect';
import { BarChart } from './Progress/Progress';
import { Stats } from './Stats/Stats';
import { ExpensesTable } from './Tables/ExpensesTable';
import { SalesTable } from './Tables/SalesTable';

export const Dashboard = () => {
  const context = useAppContext();

  useEffect(() => {
    const { startDate, endDate } = getDateRangeByPreset(
      context?.state.preset || 'today'
    );

    const todaySales = filterItemsByDateRange(
      sales,
      new Date(startDate),
      new Date(endDate)
    );
    const todayExpenses = filterItemsByDateRange(
      expenses,
      new Date(startDate),
      new Date(endDate)
    );

    const transactionIds = getAllUniqueTransactionIds([
      ...todaySales,
      ...todayExpenses,
    ]);
    const todayTransactions = transactions.filter((item) =>
      transactionIds.includes(item.id.toString())
    );

    context?.setSales(todaySales);
    context?.setExpenses(todayExpenses);
    context?.setTransactions(todayTransactions);
  }, []);

  return (
    <>
      <Card bg="gray.1" withBorder>
        <BasicPresets />
      </Card>

      <Group justify="space-between" align="flex-end" my="lg" visibleFrom="md">
        <Group align="flex-end">
          <PresetsSelect />
          <DateRange />
        </Group>
        <CollectionSelect />
      </Group>

      <Stack my="lg" hiddenFrom="md">
        <Card withBorder>
          <DateRange />
        </Card>
        <Group align="flex-end" justify="space-between">
          <PresetsSelect />
          <CollectionSelect />
        </Group>
      </Stack>

      <Stats />

      <Group my="lg" grow visibleFrom="md" align="flex-start">
        <SalesTable />
        <ExpensesTable />
      </Group>

      <Stack my="lg" hiddenFrom="md">
        <SalesTable />
        <ExpensesTable />
      </Stack>

      <Card withBorder my="md">
        <Group grow visibleFrom="md">
          <BarChart />
          <PieChart />
        </Group>

        <Stack hiddenFrom="md">
          <BarChart />
          <PieChart />
        </Stack>
      </Card>
    </>
  );
};
