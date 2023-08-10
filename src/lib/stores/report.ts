import type { Report } from "$lib/peloton/report";
import { type Writable, writable } from "svelte/store";

export const buildReportStore = (): Writable<Report> => writable();
