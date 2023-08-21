import { type Readable, writable, type Writable } from "svelte/store";

type SortDirection = "asc" | "desc";

const defaultSortFn = <T>(a: T, b: T): number => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
};

export default class DataWrapper<T extends object> {
  private static readonly DEFAULT_SORT_DIRECTION: SortDirection = "asc";

  private readonly rawData: T[];
  private readonly sortedData: Writable<T[]>;
  private sortField?: keyof T;
  private sortDirection: SortDirection = DataWrapper.DEFAULT_SORT_DIRECTION;

  public constructor(data: T[]) {
    this.rawData = data;
    this.sortedData = writable(data);
  }

  public sort(field: keyof T) {
    if (this.sortField !== field) {
      this.sortField = field;
      this.sortDirection = DataWrapper.DEFAULT_SORT_DIRECTION;
    } else if (this.sortDirection === "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortField = undefined;
      this.sortDirection = DataWrapper.DEFAULT_SORT_DIRECTION;
    }

    this.internalSort();
  }

  public getRows(): Readable<T[]> {
    return this.sortedData;
  }

  private internalSort() {
    // If we have no field to sort on, exit early
    if (!this.sortField) {
      this.sortedData.set(this.rawData);
      return;
    }

    const sortValue = this.sortDirection == "asc" ? 1 : -1;
    const sortedData = [...this.rawData].sort((a, b) => {
      return sortValue * defaultSortFn(a[this.sortField!], b[this.sortField!]);
    });
    this.sortedData.set(sortedData);
  }
}
