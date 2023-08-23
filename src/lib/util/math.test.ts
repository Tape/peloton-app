import { describe, expect, it } from "vitest";
import { sumOf } from "$lib/util/math";

describe("math", () => {
  describe("sumOf", () => {
    const data = [
      { col1: "test1", col2: 1, col3: 4 },
      { col1: "test2", col2: 2, col3: 5 },
      { col1: "test3", col2: 3, col3: 6 },
    ];

    it("should take a list of objects and sum the provided field", () => {
      expect(sumOf(data, "col2")).toMatchObject({
        col2: 6,
      });
    });

    it("should take a list of objects and sum the provided variadic fields", () => {
      expect(sumOf(data, "col2", "col3")).toMatchObject({
        col2: 6,
        col3: 15,
      });
    });
  });
});
