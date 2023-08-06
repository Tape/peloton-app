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

      expect(aggregate(csvData)).toMatchObject([
        { classes: 2, discipline: "Stretching", time: 60 },
        { classes: 1, discipline: "Cycling", time: 30 },
      ]);
    });
  });
});
