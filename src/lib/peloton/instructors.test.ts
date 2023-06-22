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

      expect(aggregate(csvData)).toEqual(
        new Map([
          ["Instructor 1", 2],
          ["Instructor 2", 1],
        ]),
      );
    });

    it("should bucket empty instructor names under 'no instructor'", () => {
      const csvData = [
        ["Column 1", "Column 2", "Instructor 1"],
        ["Column 1", "Column 2", ""],
        ["Column 1", "Column 2", ""],
      ];

      expect(aggregate(csvData)).toEqual(
        new Map([
          ["Instructor 1", 1],
          ["No Instructor", 2],
        ]),
      );
    });
  });
});
