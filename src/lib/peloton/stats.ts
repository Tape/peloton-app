type DisciplineTotal = {
  classes: number;
  time: number;
};

export type Stats = {
  totalByDiscipline: Map<string, DisciplineTotal>;
  totalClasses: number;
  totalWorkoutTime: number;
};

export const aggregate = (csvData: string[][]): Stats => {
  const stats: Stats = {
    totalByDiscipline: new Map(),
    totalClasses: 0,
    totalWorkoutTime: 0,
  };

  csvData.forEach((row) => {
    const discipline = row[4];
    const workoutLength = +row[3];

    stats.totalClasses += 1;
    stats.totalWorkoutTime += workoutLength;

    const disciplineTotal = stats.totalByDiscipline.get(discipline) || {
      classes: 0,
      time: 0,
    };

    disciplineTotal.classes += 1;
    disciplineTotal.time += workoutLength;

    stats.totalByDiscipline.set(discipline, disciplineTotal);
  });

  return stats;
};
