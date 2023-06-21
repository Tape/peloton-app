import { aggregate as aggregateInstructors, type Instructors } from "./instructors";

export type Report = {
  instructors: Instructors;
};

export const generateReport = (csvData: string[][]): Report => {
  return {
    instructors: aggregateInstructors(csvData),
  };
};
