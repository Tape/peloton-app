<script lang="ts">
  import StatsWidget from "$lib/components/widgets/StatsWidget.svelte";
  import InstructorsWidget from "$lib/components/widgets/InstructorsWidget.svelte";
  import { getReport } from "$lib/data/report-store";

  const report = getReport();
</script>

<svelte:head>
  <title>Peloton Stats</title>
</svelte:head>

<h1>Peloton Stats</h1>

{#if $report}
  <h2>Stats</h2>
  <StatsWidget stats={$report.stats} />

  <h2>Classes Taken With Instructor</h2>
  <InstructorsWidget instructors={$report.instructors} />
{:else}
  <p>Use the uploader above to upload your workout history.</p>
{/if}
