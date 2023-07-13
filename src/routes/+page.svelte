<script lang="ts">
  import { parseCsv } from "$lib/peloton/parser";
  import { type Report, generateReport } from "$lib/peloton/report";

  let report: Report;
  let error: string;

  const onChange = (event) => {
    const files = event.target.files;
    if (!files.length) {
      error = "No files selected";
      return;
    }

    if (files[0].type != "text/csv") {
      error = "File provided is not a CSV";
      return;
    }

    parseCsv(files[0], (result) => {
      report = generateReport(result);
    });
  };

  const pluralize = (singular, plural, value) => {
    return value == 1 ? singular : plural;
  };

  const toHoursAndMinutes = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const parts = [
      hours && `${hours} ${pluralize("hour", "hours", hours)}`,
      minutes && `${minutes} ${pluralize("minute", "minutes", minutes)}`,
    ];

    return parts.filter(part => !!part).join(", ");
  };
</script>

<svelte:head>
  <title>Peloton Stats</title>
</svelte:head>

<h1>Peloton Stats</h1>

{#if !report}
  {#if error}
    <div class="alert">
      {error}
    </div>
  {/if}
  <input type="file" name="file" accept="text/csv" on:change={onChange} />
{:else}
  <h2>Stats</h2>

  <p>Total classes taken: {report.stats.totalClasses}</p>
  <p>Classes by discipline:</p>
  <table>
    <thead>
      <tr>
        <th>Discipline</th>
        <th>Total Classes</th>
      </tr>
    </thead>
    <tbody>
      {#each [...report.stats.totalClassesByDiscipline] as [discipline, totalClasses]}
        <tr>
          <td>{discipline}</td>
          <td>{totalClasses}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <p>Total workout time: {toHoursAndMinutes(report.stats.totalWorkoutTime)}</p>
  <p>Workout time by discipline:</p>
  <table>
    <thead>
    <tr>
      <th>Discipline</th>
      <th>Workout Time</th>
    </tr>
    </thead>
    <tbody>
    {#each [...report.stats.totalWorkoutTimeByDiscipline] as [discipline, workoutTime]}
      <tr>
        <td>{discipline}</td>
        <td>{toHoursAndMinutes(workoutTime)}</td>
      </tr>
    {/each}
    </tbody>
  </table>

  <h2>Classes Taken With Instructor</h2>
  <table>
    <thead>
      <tr>
        <th>Instructor</th>
        <th>Classes</th>
      </tr>
    </thead>
    <tbody>
      {#each [...report.instructors] as [instructor, classCount]}
        <tr>
          <td>{instructor}</td>
          <td>{classCount}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  .alert {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background: darkred;
    border-radius: 0.5rem;
  }
</style>
