export type Stats = {
  totalClasses: number;
  totalClassesByDiscipline: Map<string, number>;
  totalWorkoutTime: number;
  totalWorkoutTimeByDiscipline: Map<String, number>;
};

export const aggregate = (csvData: string[][]): Stats => {
  const stats: Stats = {
    totalClasses: 0,
    totalClassesByDiscipline: new Map(),
    totalWorkoutTime: 0,
    totalWorkoutTimeByDiscipline: new Map(),
  };

  csvData.forEach((row) => {
    const discipline = row[4];
    const disciplineCount = stats.totalClassesByDiscipline.get(discipline) || 0;
    stats.totalClasses += 1;
    stats.totalClassesByDiscipline.set(discipline, disciplineCount + 1);

    const workoutLength = +row[3];
    const workoutTime = stats.totalWorkoutTimeByDiscipline.get(discipline) || 0;
    stats.totalWorkoutTime += workoutLength;
    stats.totalWorkoutTimeByDiscipline.set(discipline, workoutTime + workoutLength);
  });

  return stats;
};
