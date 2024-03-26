import { presets } from '@/const';
import {
  getDateRangeByPreset,
  getPresetByDateRange,
} from '@/functions/get-dates-range';
import { useUrlSearchParams } from '@/hooks/use-update-url-search-params';
import { Preset } from '@/types';
import { Select } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PresetsSelect = () => {
  const [preset, setPreset] = useState('');
  const updateSearchParams = useUrlSearchParams();
  const searchParams = useSearchParams();
  const defaultStartDate = searchParams.get('startDate');
  const defaultEndDate = searchParams.get('endDate');

  const handleSetPreset = (preset: Preset) => {
    setPreset(preset);
    const { startDate, endDate } = getDateRangeByPreset(preset);

    updateSearchParams({
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
  };

  useEffect(() => {
    if (defaultStartDate && defaultEndDate && !preset) {
      const loadedPreset = getPresetByDateRange(
        new Date(defaultStartDate),
        new Date(defaultEndDate)
      );
      console.log('here');
      setPreset(loadedPreset || '');
    }
  }, [defaultEndDate, defaultStartDate, preset]);

  return (
    <Select
      size="xs"
      placeholder="Presets"
      maw={150}
      value={preset}
      onChange={(value) => handleSetPreset(value as Preset)}
      data={presets}
      searchable
      clearable
    />
  );
};
