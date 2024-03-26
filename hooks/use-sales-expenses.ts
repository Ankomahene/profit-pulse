import { useTransactions } from '../context/TransactionsContextProvider';
import { calculateTotalAmount } from '../functions/calc';

export const useSalesAndExpenses = () => {
  const context = useTransactions();

  const salesAmount = calculateTotalAmount(context?.filteredSales || []);
  const expensesAmount = calculateTotalAmount(context?.filteredExpenses || []);

  return {
    salesAmount,
    expensesAmount,
  };
};
