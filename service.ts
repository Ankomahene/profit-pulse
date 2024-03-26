import { getAllUniqueTransactionIds } from './functions/filter';
import { IExpense, ISale, ITransaction } from './types';
import { createClient } from './utils/supabase/client';

export const loadTransactions = async (startDate: Date, endDate: Date) => {
  const supabase = createClient();

  try {
    const { data: sales, error: salesError } = await supabase
      .from('sales')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: true });

    if (salesError) {
      throw salesError;
    }

    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: true });

    if (expensesError) {
      throw expensesError;
    }

    const transactionIds = getAllUniqueTransactionIds([...sales, ...expenses]);

    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('*')
      .in('id', transactionIds);

    if (transactionsError) {
      throw transactionsError;
    }
    return {
      sales: sales as ISale[],
      expenses: expenses as IExpense[],
      transactions: transactions as ITransaction[],
    };
  } catch (error) {
    console.error('Error loading data from Supabase:', error);
    return null;
  }
};
