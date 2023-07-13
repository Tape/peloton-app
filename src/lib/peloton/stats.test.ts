import { describe, expect, it } from "vitest";
import { aggregate } from "$lib/peloton/stats";

describe("stats", () => {
  describe("aggregate", () => {
    it("should count all classes and aggregate by discipline", () => {
      const csvData = [
        ["Column 1", "Column 2", "Column 3", "Column 4", "Stretching"],
        ["Column 1", "Column 2", "Column 3", "Column 4", "Cycling"],
        ["Column 1", "Column 2", "Column 3", "Column 4", "Stretching"],
      ];

      expect(aggregate(csvData).totalClasses).toEqual(3);
      expect(aggregate(csvData).totalClassesByDiscipline).toEqual(
        new Map([
          ["Cycling", 1],
          ["Stretching", 2],
        ]),
      );
    });

    it("should count all class durations and aggregate by discipline", () => {
      const csvData = [
        ["Column 1", "Column 2", "Column 3", "45", "Stretching"],
        ["Column 1", "Column 2", "Column 3", "30", "Cycling"],
        ["Column 1", "Column 2", "Column 3", "15", "Stretching"],
      ];

      expect(aggregate(csvData).totalWorkoutTime).toEqual(90);
      expect(aggregate(csvData).totalWorkoutTimeByDiscipline).toEqual(
        new Map([
          ["Cycling", 30],
          ["Stretching", 60],
        ]),
      );
    });
  });
});
