'use client';
import { useTransactions } from '@/context/TransactionsContextProvider';
import { calculateMonthlyTotals, formattedAmount } from '@/functions/calc';
import { BarChart as Chart } from '@mantine/charts';
import { Progress } from '@mantine/core';
import classes from './Styles.module.css';

export const ProgressBar = () => {
  return (
    <Progress.Root size="xl" my="md">
      <Progress.Section
        className={classes.progressSection}
        value={250}
        color="teal"
      >
        <Progress.Label>Sales (250)</Progress.Label>
      </Progress.Section>

      <Progress.Section
        className={classes.progressSection}
        value={50}
        color="red"
      >
        <Progress.Label>Expenses (50)</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
};

export const BarChart = () => {
  const context = useTransactions();

  const data = calculateMonthlyTotals(
    context?.filteredSales || [],
    context?.filteredExpenses || []
  );

  return (
    <Chart
      h={200}
      data={data}
      dataKey="month"
      withLegend
      valueFormatter={(value) => formattedAmount(value)}
      series={[
        { name: 'totalSales', label: 'Sales', color: 'teal.6' },
        { name: 'totalExpenses', label: 'Expenses', color: 'red.6' },
      ]}
      tickLine="y"
    />
  );
};
