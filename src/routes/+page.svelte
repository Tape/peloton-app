<script lang="ts">
  import Button from "$lib/components/foundation/Button.svelte";
  import StatsWidget from "$lib/components/widgets/StatsWidget.svelte";
  import InstructorsWidget from "$lib/components/widgets/InstructorsWidget.svelte";
  import { report } from "$lib/stores";

  $: disciplines = report.disciplines();
</script>

<svelte:head>
  <title>Peloton Stats</title>
</svelte:head>

{#if $report}
  <p>
    <Button on:click={() => report.clearFilters()}>Clear Filters</Button>
  </p>

  <ul class="disciplines">
    {#each $disciplines as discipline}
      <li>
        <Button on:click={() => report.setFilters({ discipline })}>{discipline}</Button>
      </li>
    {/each}
  </ul>

  <h2>Stats</h2>
  <StatsWidget stats={$report.stats} />

  <h2>Classes Taken With Instructor</h2>
  <InstructorsWidget instructors={$report.instructors} />
{:else}
  <p>Use the uploader above to upload your workout history.</p>
{/if}

<style>
  .disciplines {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
