import { describe, expect, it } from "vitest";
import { pluralize, toHoursAndMinutes } from "$lib/util/format";

describe("format", () => {
  describe("pluralize", () => {
    it("should be single case for cases where the value is == 1", () => {
      expect(pluralize("test", "tests", 1)).toEqual("test");
    });

    it("should be plural case for cases where the value is == 0", () => {
      expect(pluralize("test", "tests", 0)).toEqual("tests");
    });

    it("should be plural case for cases where the value is > 1", () => {
      expect(pluralize("test", "tests", 2)).toEqual("tests");
    });
  });

  describe("toHoursAndMinutes", () => {
    it("should return singular terms", () => {
      expect(toHoursAndMinutes(61)).toEqual("1 hour, 1 minute");
    });

    it("should handle only hours", () => {
      expect(toHoursAndMinutes(120)).toEqual("2 hours");
    });

    it("should handle only minutes", () => {
      expect(toHoursAndMinutes(2)).toEqual("2 minutes");
    });
  });
});
