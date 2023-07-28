import { describe, expect, it } from "vitest";
import { aggregate } from "$lib/peloton/stats";

describe("stats", () => {
  describe("aggregate", () => {
    it("should count all classes and aggregate by discipline", () => {
      const csvData = [
        ["Column 1", "Column 2", "Column 3", "45", "Stretching"],
        ["Column 1", "Column 2", "Column 3", "30", "Cycling"],
        ["Column 1", "Column 2", "Column 3", "15", "Stretching"],
      ];

      expect(aggregate(csvData).totalClasses).toEqual(3);
      expect(aggregate(csvData).totalWorkoutTime).toEqual(90);
      expect(aggregate(csvData).totalByDiscipline).toEqual(
        new Map([
          ["Cycling", { classes: 1, time: 30 }],
          ["Stretching", { classes: 2, time: 60 }],
        ]),
      );
    });
  });
});
