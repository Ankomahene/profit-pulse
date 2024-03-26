'use client';
import { Card, Group, Stack } from '@mantine/core';
import { CollectionSelect } from './CollectionSelect';
import DateRange from './DateRange';
import { PieChart } from './PieChart';
import { PresetsSelect } from './PresetsSelect';
import { BarChart } from './Progress/Progress';
import { Stats } from './Stats/Stats';
import { ExpensesTable } from './Tables/Expenses';
import { SalesTable } from './Tables/Sales';
import { ResultsNotice } from './ResultsNotice';

export const Dashboard = () => {
  return (
    <>
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

      <ResultsNotice />

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
