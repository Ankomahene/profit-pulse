'use client';
import { useSalesAndExpenses } from '@/hooks/use-sales-expenses';
import { PieChart as Chart } from '@mantine/charts';
import { Center } from '@mantine/core';

export function PieChart() {
  const { salesAmount, expensesAmount } = useSalesAndExpenses();

  const data = [
    { name: 'Sales', value: salesAmount, color: 'teal' },
    { name: 'Expenses', value: expensesAmount, color: 'red' },
  ];

  return (
    <Center>
      <Chart
        data={data}
        labelsPosition="inside"
        labelsType="percent"
        withTooltip
        withLabels
      />
    </Center>
  );
}
