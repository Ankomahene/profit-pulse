import { useTransactions } from '@/context/TransactionsContextProvider';
import { getDateRangeToday } from '@/functions/get-dates-range';
import { useUrlSearchParams } from '@/hooks/use-update-url-search-params';
import { loadTransactions } from '@/service';
import { Button, LoadingOverlay } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  active: boolean;
}

export const ApplyBtn = ({ active }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const transactionsContext = useTransactions();
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const updateParams = useUrlSearchParams();

  const loadAndSetTransactions = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    const res = await loadTransactions(startDate, endDate);
    setIsLoading(false);
    const { sales, expenses, transactions } = res || {};

    transactionsContext?.setSales(sales || []);
    transactionsContext?.setExpenses(expenses || []);
    transactionsContext?.setTransactions(transactions || []);

    const transactionId = searchParams.get('trans');

    if (
      !transactions ||
      !transactions.some((item) => item.id === transactionId)
    ) {
      transactionsContext?.setFilteredSales(sales || []);
      transactionsContext?.setFilteredExpenses(expenses || []);
      updateParams({ trans: undefined });
    } else {
      transactionsContext?.setFilteredSales(
        sales?.filter((item) => item.transaction_id === transactionId) || []
      );
      transactionsContext?.setFilteredExpenses(
        expenses?.filter((item) => item.transaction_id === transactionId) || []
      );
    }
  };

  const handleApply = async () => {
    if (startDate && endDate) {
      loadAndSetTransactions(new Date(startDate), new Date(endDate));
    }
  };

  useEffect(() => {
    if (!startDate || !endDate) {
      const { startDate: sdt, endDate: edt } = getDateRangeToday();
      updateParams({
        startDate: new Date(sdt).toISOString(),
        endDate: new Date(edt).toISOString(),
      });
      loadAndSetTransactions(new Date(sdt), new Date(edt));
    } else {
      loadAndSetTransactions(new Date(startDate), new Date(endDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingOverlay visible={isLoading} w="100%" />
      <Button
        miw={80}
        size="xs"
        opacity={!active ? 0.5 : 1}
        color="gray"
        disabled={!active}
        onClick={handleApply}
      >
        Apply
      </Button>
    </>
  );
};
