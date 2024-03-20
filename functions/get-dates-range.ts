import { DateRange, Preset } from '@/types';

const setHours = (startDate: Date, endDate: Date) => {
  startDate.setHours(0, 0, 0, 0); // Set start of the day
  endDate.setHours(23, 59, 59, 999); // Set end of the day
};

export function getDateRangeToday(): DateRange {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);

  setHours(startDate, endDate);

  return { startDate, endDate };
}

export function getDateRangeYesterday(): DateRange {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const startDate = new Date(date);
  const endDate = new Date(date);

  setHours(startDate, endDate);

  return { startDate, endDate };
}

export function getDateRangeThisWeek(): DateRange {
  const today = new Date();
  const startDate = new Date(today);
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

  // Set the start date to the first day of the current week (Sunday)
  startDate.setDate(today.getDate() - dayOfWeek);

  // Set the end date to today. i.e the current day
  const endDate = new Date(today);

  setHours(startDate, endDate);

  return { startDate, endDate };
}

const getDateRangePastNDays = (n: number): DateRange => {
  const today = new Date();
  const endDate = today; // End date is today

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - n); // Start date is 7 days ago

  setHours(startDate, endDate);

  return { startDate, endDate };
};

export function getDateRangePast7Days(): DateRange {
  return getDateRangePastNDays(6);
}

export function getDateRangePast15Days(): DateRange {
  return getDateRangePastNDays(14);
}

export function getDateRangePast30Days(): DateRange {
  return getDateRangePastNDays(29);
}

export function getDateRangePast60Days(): DateRange {
  return getDateRangePastNDays(59);
}

export function getDateRangePast90Days(): DateRange {
  return getDateRangePastNDays(89);
}

export function getDateRangePast1Year(): DateRange {
  const endDate = new Date(); // End date is today
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear() - 1); // Start date is 1 year ago
  startDate.setHours(0, 0, 0, 0); // Set start of the day
  return { startDate, endDate };
}

export function getDateRangeThisYear(): DateRange {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1); // Start of the year
  const endDate = new Date(today); // End of the year
  endDate.setHours(23, 59, 59, 999); // Set end of the day
  return { startDate, endDate };
}

export function getDateRangeLastYear(): DateRange {
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, 0, 1); // Start of last year
  const endDate = new Date(today.getFullYear(), 0, 0); // End of last year
  endDate.setHours(23, 59, 59, 999); // Set end of the day
  return { startDate, endDate };
}

export const getDateRangeByPreset = (preset: Preset) => {
  switch (preset) {
    case 'today':
      return getDateRangeToday();
    case 'yesterday':
      return getDateRangeYesterday();
    case 'thisWeek':
      return getDateRangeThisWeek();
    case 'past7Days':
      return getDateRangePast7Days();
    case 'past15Days':
      return getDateRangePast15Days();
    case 'past30Days':
      return getDateRangePast30Days();
    case 'past60Days':
      return getDateRangePast60Days();
    case 'past90Days':
      return getDateRangePast90Days();
    case 'past1Year':
      return getDateRangePast1Year();
    case 'thisYear':
      return getDateRangeThisYear();
    case 'lastYear':
      return getDateRangeLastYear();
    default:
      return getDateRangeToday();
  }
};
