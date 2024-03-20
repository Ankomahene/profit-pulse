import { AppLayout } from '@/components/AppLayout';
import { Dashboard } from '@/components/Dashboard';
import { expenses } from '@/data/expenses';
import { sales } from '@/data/sales';
import { transactions } from '@/data/transactions';
import { IExpense, ISale, ITransaction } from '@/types';

const salesData: ISale[] = sales;
const expensesData: IExpense[] = expenses;
const transactionsData: ITransaction[] = transactions;

export default function Home() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}
