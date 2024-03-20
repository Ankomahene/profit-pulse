'use client';
import { IExpense, ISale, ITransaction, Preset } from '@/types';
import { useLocalStorage } from '@mantine/hooks';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface IState {
  preset: Preset | undefined;
  transactionId: string | number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  sales: ISale[];
  expenses: IExpense[];
  transactions: ITransaction[];
}

interface IContext {
  state: IState;
  setPreset: (preset: Preset | undefined) => void;
  setTransaction: (transactionId: string | number) => void;
  setDateRange: (startDate: Date, endDate: Date) => void;
  setSales: (sales: ISale[]) => void;
  setExpenses: (expenses: IExpense[]) => void;
  setTransactions: (transactions: ITransaction[]) => void;
}

const Context = createContext<IContext | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useLocalStorage<IState>({
    key: 'trans_profit_pulse',
    defaultValue: {
      preset: 'today',
      transactionId: undefined,
      startDate: undefined,
      endDate: undefined,
      sales: [],
      expenses: [],
      transactions: [],
    },
  });

  const setPreset = (preset: Preset | undefined) => {
    setState((prevState) => ({
      ...prevState,
      preset,
      transactionId: undefined,
    }));
  };

  const setTransaction = (transactionId: string | number) => {
    setState((prevState) => ({
      ...prevState,
      preset: undefined,
      transactionId,
    }));
  };

  const setDateRange = (startDate: Date, endDate: Date) => {
    setState((prevState) => ({ ...prevState, startDate, endDate }));
  };

  const setSales = (sales: ISale[]) => {
    setState((prevState) => ({ ...prevState, sales }));
  };

  const setExpenses = (expenses: IExpense[]) => {
    setState((prevState) => ({ ...prevState, expenses }));
  };

  const setTransactions = (transactions: ITransaction[]) => {
    setState((prevState) => ({ ...prevState, transactions }));
  };

  const resetData = () => {
    setState({
      preset: 'today',
      transactionId: undefined,
      startDate: undefined,
      endDate: undefined,
      sales: [],
      expenses: [],
      transactions: [],
    });
  };

  return (
    <Context.Provider
      value={{
        state,
        setPreset,
        setTransaction,
        setDateRange,
        setSales,
        setExpenses,
        setTransactions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);

  return context;
};
