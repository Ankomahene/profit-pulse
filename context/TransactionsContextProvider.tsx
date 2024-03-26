'use client';
import { IExpense, ISale, ITransaction } from '@/types';
import { ReactNode, createContext, useContext, useState } from 'react';

interface IContext {
  sales: ISale[];
  expenses: IExpense[];
  filteredSales: ISale[];
  filteredExpenses: IExpense[];
  transactions: ITransaction[];
  setSales: (sales: ISale[]) => void;
  setExpenses: (expenses: IExpense[]) => void;
  setTransactions: (transactions: ITransaction[]) => void;
  setFilteredSales: (filteredSales: ISale[]) => void;
  setFilteredExpenses: (filteredExpenses: IExpense[]) => void;
}

const Context = createContext<IContext | null>(null);

export const TransactionsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sales, setSalesData] = useState<ISale[]>([]);
  const [filteredSales, setFilteredSalesData] = useState<ISale[]>([]);
  const [expenses, setExpensesData] = useState<IExpense[]>([]);
  const [filteredExpenses, setFilteredExpensesData] = useState<IExpense[]>([]);
  const [transactions, setTransactionsData] = useState<ITransaction[]>([]);

  const setSales = (sales: ISale[]) => {
    setSalesData(sales);
  };

  const setExpenses = (expenses: IExpense[]) => {
    setExpensesData(expenses);
  };

  const setTransactions = (transactions: ITransaction[]) => {
    setTransactionsData(transactions);
  };

  const setFilteredSales = (filteredSales: ISale[]) => {
    setFilteredSalesData(filteredSales);
  };

  const setFilteredExpenses = (filteredExpenses: IExpense[]) => {
    setFilteredExpensesData(filteredExpenses);
  };

  return (
    <Context.Provider
      value={{
        sales,
        filteredSales,
        expenses,
        filteredExpenses,
        transactions,
        setSales,
        setExpenses,
        setTransactions,
        setFilteredSales,
        setFilteredExpenses,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(Context);

  return context;
};
