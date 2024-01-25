export type Instructor = {
  classes: number;
  name: string;
};

export type Instructors = Instructor[];

export const aggregate = (csvData: string[][]): Instructors => {
  const instructors = csvData.reduce((instructors, row) => {
    const instructor = row[2] || "No Instructor";
    const value = instructors.get(instructor) || 0;
    instructors.set(instructor, value + 1);
    return instructors;
  }, new Map());

  return Array.from(instructors, ([key, value]) => ({
    classes: value,
    name: key,
  }));
};
