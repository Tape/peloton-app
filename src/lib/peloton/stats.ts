export type Stats = {
  totalClasses: number;
  totalClassesByDiscipline: Map<string, number>;
};

export const aggregate = (csvData: string[][]): Stats => {
  const stats: Stats = {
    totalClasses: 0,
    totalClassesByDiscipline: new Map(),
  };

  csvData.forEach((row) => {
    const discipline = row[4];
    const disciplineCount = stats.totalClassesByDiscipline.get(discipline) || 0;

    stats.totalClasses += 1;
    stats.totalClassesByDiscipline.set(discipline, disciplineCount + 1);
  });

  return stats;
};
