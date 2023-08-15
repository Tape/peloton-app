import type { Writable } from "svelte/store";
import type { Report } from "$lib/peloton/report";
import { writable } from "svelte/store";

export const error: Writable<string> = writable();
export const report: Writable<Report> = writable();
