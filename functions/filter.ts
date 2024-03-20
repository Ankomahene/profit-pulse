import { IExpense, ISale, ITransaction } from '@/types';

export function filterItemsByDateRange(
  items: ISale[] | IExpense[] | ITransaction[],
  startDate: Date,
  endDate: Date
): any[] {
  return items.filter((item) => {
    const createdAt = new Date(item.created_at);
    return createdAt >= startDate && createdAt <= endDate;
  });
}

export function getAllUniqueTransactionIds(
  sales: ISale[] | IExpense[]
): string[] {
  const uniqueTransactionIds = new Set<string>();
  for (const sale of sales) {
    uniqueTransactionIds.add(sale.transaction_id.toString());
  }
  return Array.from(uniqueTransactionIds);
}
