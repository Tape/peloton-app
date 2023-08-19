type TypedValues<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export const sumOf = <T, K extends TypedValues<T, number>>(data: T[], ...fields: K[]): { [Key in K]: number } => {
  return fields.reduce(
    (acc, field) => {
      acc[field] = data.reduce((sum: number, row: T) => sum + (row[field] as number), 0);
      return acc;
    },
    {} as { [Key in K]: number },
  );
};
