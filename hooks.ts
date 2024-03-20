import { useAppContext } from './app/ContextProvider';
import { calculateTotalAmount } from './functions/calc';

export const useSalesAndExpenses = () => {
  const context = useAppContext();

  const salesAmount = calculateTotalAmount(context?.state.sales || []);
  const expensesAmount = calculateTotalAmount(context?.state.expenses || []);

  return {
    salesAmount,
    expensesAmount,
  };
};
