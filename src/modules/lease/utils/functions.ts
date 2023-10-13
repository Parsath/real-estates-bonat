export function validateDates(startDate: string, endDate?: string) {
  const datePattern = /^(0[1-9]|1[0-2])([-\/])(0[1-9]|[12][0-9]|3[01])\2\d{4}$/;
  return (
    datePattern.test(startDate) && (endDate ? datePattern.test(endDate) : true)
  );
}
