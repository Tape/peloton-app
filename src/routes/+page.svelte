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
