import { Preset } from './types';

export const presets: { label: string; value: Preset }[] = [
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
