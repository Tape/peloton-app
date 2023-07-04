export type Instructors = Map<String, number>;

export const aggregate = (csvData: string[][]): Instructors => {
  return csvData.reduce((instructors, row) => {
    const instructor = row[2] || "No Instructor";
    const value = instructors.get(instructor) || 0;
    instructors.set(instructor, value + 1);
    return instructors;
  }, new Map() as Instructors);
};
