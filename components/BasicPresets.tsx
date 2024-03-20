import { useAppContext } from '@/app/ContextProvider';
import { Preset } from '@/types';
import { Button, Group } from '@mantine/core';
import React from 'react';

export const BasicPresets = () => {
  const context = useAppContext();

  const selectedPreset = context?.state.preset;

  const handleSetBasicPreset = (preset: Preset) => {
    context?.setPreset(preset);
  };

  return (
    <Group>
      <Button
        size="xs"
        variant={selectedPreset === 'today' ? 'filled' : 'light'}
        radius="xs"
        onClick={() => handleSetBasicPreset('today')}
      >
        Today
      </Button>

      <Button
        size="xs"
        variant={selectedPreset === 'yesterday' ? 'filled' : 'light'}
        radius="xs"
        onClick={() => handleSetBasicPreset('yesterday')}
      >
        Yesterday
      </Button>
      <Button
        size="xs"
        variant={selectedPreset === 'thisWeek' ? 'filled' : 'light'}
        radius="xs"
        onClick={() => handleSetBasicPreset('thisWeek')}
      >
        This Week
      </Button>
    </Group>
  );
};
