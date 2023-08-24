export type StatEntry = {
  classes: number;
  discipline: string;
  time: number;
};

export type Stats = StatEntry[];

export const aggregate = (csvData: string[][]): Stats => {
  const disciplineMap = new Map<string, StatEntry>();

  csvData.forEach((row) => {
    const discipline = row[4];
    const workoutLength = +row[3];

    const statEntry = disciplineMap.get(discipline) || {
      classes: 0,
      discipline,
      time: 0,
    };

    statEntry.classes += 1;
    statEntry.time += workoutLength;

    disciplineMap.set(discipline, statEntry);
  });

  return [...disciplineMap.values()];
};
