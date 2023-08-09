import type { Report } from "$lib/peloton/report";
import { type Readable, writable } from "svelte/store";

const report = writable<Report>();

export const getReport = (): Readable<Report> => {
  return report;
};

export const setReport = (newReport: Report) => {
  report.set(newReport);
};
