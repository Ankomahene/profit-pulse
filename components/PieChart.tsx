'use client';
import { useAppContext } from '@/app/ContextProvider';
import { calculateTotalAmount } from '@/functions/calc';
import { useSalesAndExpenses } from '@/hooks';
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
