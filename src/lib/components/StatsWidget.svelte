<script lang="ts">
  import type { Stats } from "$lib/peloton/stats";
  import { toHoursAndMinutes } from "$lib/util/format";

  export let stats: Stats;
</script>

<table>
  <thead>
    <tr>
      <th>Discipline</th>
      <th>Total Classes</th>
      <th>Workout Time</th>
    </tr>
  </thead>
  <tbody>
    {#each [...stats.totalByDiscipline] as [discipline, { classes, time }]}
      <tr>
        <td>{discipline}</td>
        <td>{classes}</td>
        <td>{toHoursAndMinutes(time)}</td>
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
