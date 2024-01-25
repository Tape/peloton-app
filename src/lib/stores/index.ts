import { derived, type Readable, writable, type Writable } from "svelte/store";
import { generateReport, type Report } from "$lib/peloton/report";

export const error: Writable<string> = writable();

type Filters = {
  discipline?: string;
};

class ReportStore implements Readable<Report> {
  private readonly data: Writable<string[][]>;
  private readonly filters: Writable<Filters>;

  private readonly filteredReport: Readable<Report>;
  private readonly report: Readable<Report>;

  public constructor() {
    this.data = writable();
    this.filters = writable({});

    this.filteredReport = derived([this.data, this.filters], ([$data, $filters]) => {
      const filteredData = $data?.filter((row) => {
        return !($filters.discipline && row[4] !== $filters.discipline);
      });

      return filteredData && generateReport(filteredData);
    });

    this.report = derived(this.data, ($data) => $data && generateReport($data));
  }

  public setData(data: string[][]) {
    this.data.set(data);
  }

  public clearFilters() {
    this.setFilters({});
  }

  public disciplines(): Readable<string[]> {
    return derived(this.report, ($report) =>
      $report && $report.stats.map(stat => stat.discipline));
  }

  public setFilters(filters: Filters) {
    this.filters.set(filters);
  }

  public get subscribe(): Readable<Report>["subscribe"] {
    return this.filteredReport.subscribe;
  }
}

export const report: ReportStore = new ReportStore();
