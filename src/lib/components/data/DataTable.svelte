<script lang="ts">
  type ColumnDefinition = {
    label: string;
    property: string;
    sortable?: boolean;
    sortFn?: (a: any, b: any) => number;
    tag?: string;
    transform?: (arg0: any) => any;
  };

  type DataRow = { [key: string]: any };

  type SortDirection = "asc" | "desc";

  export let columns: ColumnDefinition[];
  export let data: DataRow[];

  let sortColumn: ColumnDefinition | undefined;
  let sortDirection: SortDirection | undefined;

  const defaultSortFn = (a: any, b: any) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  };

  const defaultTransformFn = (a: any) => a;

  const onHeaderClick = (column: ColumnDefinition) => {
    if (sortColumn != column) {
      sortColumn = column;
      sortDirection = "asc";
      return;
    }

    if (sortDirection == "asc") {
      sortDirection = "desc";
    } else {
      sortColumn = undefined;
      sortDirection = undefined;
    }
  }

  const sort = (rows: DataRow[], column?: ColumnDefinition, direction?: string) => {
    if (!column) {
      return rows;
    }

    const sortFn = column.sortFn || defaultSortFn;
    const sortValue = direction == "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      return sortValue * sortFn(a[column.property], b[column.property]);
    });
  };

  $: sortedData = sort(data, sortColumn, sortDirection);
</script>

<table>
  <thead>
    <tr>
      {#each columns as column}
        <th on:click={() => onHeaderClick(column)}>
          {column.label}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each sortedData as row}
      <tr>
        {#each columns as column}
          <svelte:element this={column.tag || "td"}>
            {(column.transform || defaultTransformFn)(row[column.property])}
          </svelte:element>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
