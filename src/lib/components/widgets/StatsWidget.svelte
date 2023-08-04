<script lang="ts">
  import DataWrapper from "$lib/data/data-wrapper";
  import type { Stats } from "$lib/peloton/stats";
  import { toHoursAndMinutes } from "$lib/util/format";

  export let stats: Stats;

  const buildWrapper = () => {
    const data = [...stats.totalByDiscipline]
      .map(([discipline, { classes, time }]) =>
        ({ classes, discipline, time }));

    return new DataWrapper(data);
  };

  const wrapper = buildWrapper();
  const rows = wrapper.getRows();
</script>

<table>
  <thead>
    <tr>
      <th on:click={() => wrapper.sort("discipline")}>Discipline</th>
      <th on:click={() => wrapper.sort("classes")}>Classes</th>
      <th on:click={() => wrapper.sort("time")}>Time</th>
    </tr>
  </thead>
  <tbody>
    {#each $rows as row}
      <tr>
        <td>{row.discipline}</td>
        <td>{row.classes}</td>
        <td>{toHoursAndMinutes(row.time)}</td>
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      <th>{stats.totalClasses}</th>
      <th>{toHoursAndMinutes(stats.totalWorkoutTime)}</th>
    </tr>
  </tfoot>
</table>
