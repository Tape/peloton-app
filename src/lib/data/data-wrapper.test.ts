import { describe, expect } from "vitest";
import DataWrapper from "$lib/data/data-wrapper";
import { get } from "svelte/store";

describe("DataWrapper", () => {
  describe("sort", () => {
    const data = [
      { col1: 3, col2: 5 },
      { col1: 1, col2: 6 },
      { col1: 2, col2: 4 },
    ];

    it("should sort the data by the provided column in ascending order", () => {
      const wrapper = new DataWrapper(data);
      wrapper.sort("col1");
      const rows = get(wrapper.getRows());
      expect(rows).toMatchObject([
        { col1: 1, col2: 6 },
        { col1: 2, col2: 4 },
        { col1: 3, col2: 5 },
      ]);
    });

    it("should sort the data by the provided column in descending order when sorted twice", () => {
      const wrapper = new DataWrapper(data);
      wrapper.sort("col1");
      wrapper.sort("col1");
      const rows = get(wrapper.getRows());
      expect(rows).toMatchObject([
        { col1: 3, col2: 5 },
        { col1: 2, col2: 4 },
        { col1: 1, col2: 6 },
      ]);
    });

    it("should revert to the raw data when sorting a third time", () => {
      const wrapper = new DataWrapper(data);
      wrapper.sort("col1");
      wrapper.sort("col1");
      wrapper.sort("col1");
      const rows = get(wrapper.getRows());
      expect(rows).toMatchObject(data);
    });

    it("should switch back to ascending when switching columns", () => {
      const wrapper = new DataWrapper(data);
      wrapper.sort("col1");
      wrapper.sort("col1");
      wrapper.sort("col2");
      const rows = get(wrapper.getRows());
      expect(rows).toMatchObject([
        { col1: 2, col2: 4 },
        { col1: 3, col2: 5 },
        { col1: 1, col2: 6 },
      ]);
    });
  });
});
