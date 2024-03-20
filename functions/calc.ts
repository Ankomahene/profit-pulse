import { IExpense, ISale } from '@/types';

export function calculateTotalAmount(items: ISale[] | IExpense[]): number {
  let totalAmount = 0;
  for (const item of items) {
    totalAmount += item.amount;
  }
  return totalAmount;
}

interface MonthlyTotal {
  month: string;
  totalSales: number;
  totalExpenses: number;
}

const monthNames: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function calculateMonthlyTotals(
  sales: ISale[],
  expenses: IExpense[]
): MonthlyTotal[] {
  const monthlyTotalsMap: { [month: string]: MonthlyTotal } = {};

  for (const sale of sales) {
    const saleDate = new Date(sale.created_at);
    const monthKey = `${
      monthNames[saleDate.getMonth()]
    } ${saleDate.getFullYear()}`;
    if (!monthlyTotalsMap[monthKey]) {
      monthlyTotalsMap[monthKey] = {
        month: monthKey,
        totalSales: 0,
        totalExpenses: 0,
      };
    }
    monthlyTotalsMap[monthKey].totalSales += sale.amount;
  }

  for (const expense of expenses) {
    const saleDate = new Date(expense.created_at);
    const monthKey = `${
      monthNames[saleDate.getMonth()]
    } ${saleDate.getFullYear()}`;
    if (!monthlyTotalsMap[monthKey]) {
      monthlyTotalsMap[monthKey] = {
        month: monthKey,
        totalSales: 0,
        totalExpenses: 0,
      };
    }
    monthlyTotalsMap[monthKey].totalExpenses += expense.amount;
  }

  const monthlyTotals: MonthlyTotal[] = Object.values(monthlyTotalsMap);

  return monthlyTotals;
}

export function formattedAmount(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
