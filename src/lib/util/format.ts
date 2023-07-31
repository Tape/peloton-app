export const pluralize = (singular: string, plural: string, value: number) => {
  return value == 1 ? singular : plural;
};

export const toHoursAndMinutes = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  const parts = [
    hours && `${hours} ${pluralize("hour", "hours", hours)}`,
    minutes && `${minutes} ${pluralize("minute", "minutes", minutes)}`,
  ];

  return parts.filter((part) => !!part).join(", ");
};
