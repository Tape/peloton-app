<script lang="ts">
  import type { Stats } from "$lib/peloton/stats";
  import { toHoursAndMinutes } from "$lib/util/format";
  import DataTable from "$lib/components/data/DataTable.svelte";

  export let stats: Stats;

  const dataTableData = [...stats.totalByDiscipline]
    .map(([discipline, { classes, time }]) =>
      ({ classes, discipline, time }));
</script>

<DataTable
  columns={[
    { label: "Discipline", property: "discipline" },
    { label: "Total Classes", property: "classes" },
    { label: "Workout Time", property: "time", transform: toHoursAndMinutes },
  ]}
  data={dataTableData}
/>
