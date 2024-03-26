import { useTransactions } from '@/context/TransactionsContextProvider';
import { formatDate } from '@/functions/format-date';
import { Alert, Text } from '@mantine/core';
import { getFormattedDate } from '@mantine/dates';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export const ResultsNotice = () => {
  const context = useTransactions();
  const searchParams = useSearchParams();
  const transId = searchParams.get('trans');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const selectedTransactionLabel = context?.transactions.find(
    (transaction) => transaction.id === transId
  )?.name;

  return (
    <Alert variant="transparent" color="gray">
      <Text c="dimmed" size="sm" fs="italic">
        You are seeing results for <b>{selectedTransactionLabel}</b>{' '}
        {transId ? 'of' : ''}{' '}
        <b>
          {startDate ? formatDate(startDate) : ''}
          {' - '}
          {endDate ? formatDate(endDate) : ''}
        </b>
      </Text>
    </Alert>
  );
};
