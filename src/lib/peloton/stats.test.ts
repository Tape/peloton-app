import { describe, expect, it } from "vitest";
import { aggregate } from "$lib/peloton/stats";

describe("stats", () => {
  describe("aggregate", () => {
    it("should count all classes", () => {
      const csvData = [
        ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"],
        ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"],
        ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"],
      ];

      expect(aggregate(csvData).totalClasses).toEqual(3);
    });

    it("should aggregate classes by discipline", () => {
      const csvData = [
        ["Column 1", "Column 2", "Column 3", "Column 4", "Stretching"],
        ["Column 1", "Column 2", "Column 3", "Column 4", "Cycling"],
        ["Column 1", "Column 2", "Column 3", "Column 4", "Stretching"],
      ];

      expect(aggregate(csvData).totalClassesByDiscipline).toEqual(
        new Map([
          ["Cycling", 1],
          ["Stretching", 2],
        ]),
      );
    });
  });
});
