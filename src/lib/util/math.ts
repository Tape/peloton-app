export const sumOf = <T extends { [key: string]: any }, K extends keyof T>(
  data: T[],
  ...fields: K[]
): { [key in K]: number } => {
  // Initialize an object containing all K's provided with 0
  const totals = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: 0,
    }),
    {} as { [key in K]: number },
  );

  // Sum the total of all Ks for each row
  data.forEach((row) => {
    for (const field of fields) {
      totals[field] += row[field];
    }
  });

  return totals;
};
