<script lang="ts">
  import DataWrapper from "$lib/data/data-wrapper";
  import type { Stats } from "$lib/peloton/stats";
  import { toHoursAndMinutes } from "$lib/util/format";
  import { sumOf } from "$lib/util/math";

  export let stats: Stats;

  const wrapper = new DataWrapper(stats);
  const rows = wrapper.getRows();

  const { classes: totalClasses, time: totalTime } = sumOf(stats, "classes", "time");
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
      <th>{totalClasses}</th>
      <th>{toHoursAndMinutes(totalTime)}</th>
    </tr>
  </tfoot>
</table>
