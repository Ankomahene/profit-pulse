import React, { useEffect } from 'react';
import { Select } from '@mantine/core';
import { useAppContext } from '@/app/ContextProvider';
import { Preset } from '@/types';

const presets: { label: string; value: Preset }[] = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
  },
  {
    label: 'This Week',
    value: 'thisWeek',
  },
  {
    label: 'Last 7 days',
    value: 'past7Days',
  },
  {
    label: 'Last 15 Days',
    value: 'past15Days',
  },
  {
    label: 'Last 30 days',
    value: 'past30Days',
  },
  {
    label: 'Last 60 days',
    value: 'past60Days',
  },
  {
    label: 'Last 90 days',
    value: 'past90Days',
  },
  {
    label: 'This Year',
    value: 'thisYear',
  },
  {
    label: 'Last Year',
    value: 'lastYear',
  },
  {
    label: 'Past 1 Year',
    value: 'past1Year',
  },

  {
    label: 'All Time',
    value: 'allTime',
  },
];

export const PresetsSelect = () => {
  const context = useAppContext();

  const handleSetPreset = (preset: Preset) => {
    context?.setPreset(preset);
  };

  useEffect(() => {
    // console.log(context?.state);
  }, [context?.state]);

  return (
    <Select
      size="xs"
      placeholder="Presets"
      maw={150}
      value={context?.state.preset || ''}
      onChange={(value) => handleSetPreset(value as Preset)}
      data={presets}
      searchable
      clearable
    />
  );
};
