'use client';
import { useSalesAndExpenses } from '@/hooks/use-sales-expenses';
import { Text } from '@mantine/core';
import classes from './Stats.module.css';
import { formattedAmount } from '@/functions/calc';

export function Stats() {
  const { salesAmount, expensesAmount } = useSalesAndExpenses();

  const data = [
    {
      title: 'Sales',
      stats: formattedAmount(salesAmount),
      description: 'Total amount of sales',
    },
    {
      title: 'Expenses',
      stats: formattedAmount(expensesAmount),
      description: 'Total amount of expense',
    },
    {
      title: 'Profits',
      stats: (salesAmount - expensesAmount).toFixed(2),
      description: 'Profits made',
    },
  ];

  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
