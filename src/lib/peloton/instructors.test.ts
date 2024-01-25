import { describe, expect, it } from "vitest";
import { aggregate } from "$lib/peloton/instructors";

describe("instructors", () => {
  describe("aggregate", () => {
    it("should count instances of the same instructor", () => {
      const csvData = [
        ["Column 1", "Column 2", "Instructor 1"],
        ["Column 1", "Column 2", "Instructor 2"],
        ["Column 1", "Column 2", "Instructor 1"],
      ];

      expect(aggregate(csvData)).toEqual([
        { name: "Instructor 1", classes: 2 },
        { name: "Instructor 2", classes: 1 },
      ]);
    });

    it("should bucket empty instructor names under 'no instructor'", () => {
      const csvData = [
        ["Column 1", "Column 2", "Instructor 1"],
        ["Column 1", "Column 2", ""],
        ["Column 1", "Column 2", ""],
      ];

      expect(aggregate(csvData)).toEqual([
        { name: "Instructor 1", classes: 1 },
        { name: "No Instructor", classes: 2 },
      ]);
    });
  });
});
