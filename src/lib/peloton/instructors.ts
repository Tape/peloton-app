export type Instructors = Map<String, number>;

export const aggregate = (csvData: string[][]): Instructors => {
  return csvData.reduce((instructors, row) => {
    const instructor = row[2] || "No Instructor";
    const value = instructors.get(instructor);
    instructors.set(instructor, value ? value + 1 : 1);
    return instructors;
  }, new Map() as Instructors);
};
