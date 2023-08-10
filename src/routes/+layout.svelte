<script lang="ts">
  import { parseCsv } from "$lib/peloton/parser";
  import { generateReport } from "$lib/peloton/report";
  import { report } from "$lib/stores";
  import "../app.css";

  let error: string;
  let uploadInput: HTMLInputElement;

  const onFileUpload = (event: Event) => {
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
      $report = generateReport(result);
    });
  };
</script>

<header>
  <nav>
    <a href="/">Peloton Stats</a>
    <button type="button" on:click={() => uploadInput.click()}>Upload</button>
    <input type="file" name="file" accept="text/csv" hidden bind:this={uploadInput} on:change={onFileUpload} />
  </nav>
</header>
<main>
  {#if error}
    <div class="alert">
      {error}
    </div>
  {/if}
  <slot />
</main>

<style>
  .alert {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background: darkred;
    border-radius: 0.5rem;
  }
</style>
