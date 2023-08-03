<script lang="ts">
  import { parseCsv } from "$lib/peloton/parser";
  import { type Report, generateReport } from "$lib/peloton/report";
  import StatsWidget from "$lib/components/widgets/StatsWidget.svelte";
  import InstructorsWidget from "$lib/components/widgets/InstructorsWidget.svelte";

  let report: Report;
  let error: string;

  const onChange = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files?.length) {
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
  <h2>Stats</h2>
  <StatsWidget stats={report.stats} />

  <h2>Classes Taken With Instructor</h2>
  <InstructorsWidget instructors={report.instructors} />
{/if}

<style>
  .alert {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background: darkred;
    border-radius: 0.5rem;
  }
</style>
