import { buildReportStore } from "./report";
import type { Writable } from "svelte/store";
import type { Report } from "$lib/peloton/report";

export const report: Writable<Report> = buildReportStore();
