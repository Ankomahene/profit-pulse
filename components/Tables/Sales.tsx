import { useTransactions } from '@/context/TransactionsContextProvider';
import { TransactionItems } from './TransactionItems';

export const SalesTable = () => {
  const context = useTransactions();

  return (
    <TransactionItems label="Sales" items={context?.filteredSales || []} />
  );
};
