import { render, within } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import type { Instructors } from "$lib/peloton/instructors";
import InstructorsWidget from "$lib/components/widgets/InstructorsWidget.svelte";

describe("<InstructorsWidget />", () => {
  const mockInstructors: Instructors = [
    { name: "No Instructor", classes: 1 },
    { name: "Matt Wilpers", classes: 2 },
  ];

  it("Should render a table with the instructor and classes taken", () => {
    const { getByText } = render(InstructorsWidget, {
      props: {
        instructors: mockInstructors,
      },
    });

    const noInstructorRow = getByText("No Instructor").closest("tr")!;
    expect(within(noInstructorRow).getByText("1")).toBeInTheDocument();

    const mattWilpersRow = getByText("Matt Wilpers").closest("tr")!;
    expect(within(mattWilpersRow).getByText("2")).toBeInTheDocument();
  });
});
