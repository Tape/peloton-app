import { aggregate as aggregateInstructors, type Instructors } from "./instructors";
import { aggregate as aggregateStats, type Stats } from "./stats";

export type Report = {
  instructors: Instructors;
  stats: Stats;
};

export const generateReport = (csvData: string[][]): Report => {
  return {
    instructors: aggregateInstructors(csvData),
    stats: aggregateStats(csvData),
  };
};
