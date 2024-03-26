export function formatDate(date: Date | string): string {
  const newDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // Abbreviated weekday name (e.g., "Tue")
    day: '2-digit', // Two-digit day of the month (e.g., "26")
    month: 'short', // Abbreviated month name (e.g., "Mar")
    year: 'numeric', // Four-digit year (e.g., "2024")
  };

  return newDate.toLocaleDateString('en-US', options);
}
