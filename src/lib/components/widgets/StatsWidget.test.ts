import { render, within } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import StatsWidget from "$lib/components/widgets/StatsWidget.svelte";
import type { Stats } from "$lib/peloton/stats";

describe("<StatsWidget />", () => {
  const mockStats: Stats = {
    totalByDiscipline: new Map([
      [
        "Cycling",
        {
          classes: 2,
          time: 45,
        },
      ],
      [
        "Stretching",
        {
          classes: 1,
          time: 20,
        },
      ],
    ]),
    totalClasses: 3,
    totalWorkoutTime: 55,
  };

  it("Should render a table with the given stats property", () => {
    const { getByText } = render(StatsWidget, {
      props: {
        stats: mockStats,
      },
    });

    const cyclingRow = getByText("Cycling").closest("tr")!!;
    expect(within(cyclingRow).getByText("2")).toBeInTheDocument();
    expect(within(cyclingRow).getByText("45 minutes")).toBeInTheDocument();

    const stretchingRow = getByText("Stretching").closest("tr")!!;
    expect(within(stretchingRow).getByText("1")).toBeInTheDocument();
    expect(within(stretchingRow).getByText("20 minutes")).toBeInTheDocument();
  });
});
