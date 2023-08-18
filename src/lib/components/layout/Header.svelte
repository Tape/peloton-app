<script lang="ts">
  import { parseCsv } from "$lib/peloton/parser";
  import { error, report } from "$lib/stores";
  import { generateReport } from "$lib/peloton/report";
  import Button from "$lib/components/foundation/Button.svelte";

  let uploadInput: HTMLInputElement;

  const onFileUpload = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files?.length) {
      $error = "No files selected";
      return;
    }

    if (files[0].type != "text/csv") {
      $error = "File provided is not a CSV";
      return;
    }

    parseCsv(files[0], (result) => {
      $report = generateReport(result);
    });
  };
</script>

<header>
  <div class="logo">
    <a href="/">Peloton Stats</a>
  </div>
  <nav>
    <div class="actions">
      <Button class="upload" type="button" on:click={() => uploadInput.click()}>Upload</Button>
      <input type="file" name="file" accept="text/csv" hidden bind:this={uploadInput} on:change={onFileUpload} />
    </div>
  </nav>
</header>

<style>
  header {
    width: 100%;
    height: 100px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }

  .actions :global(.upload) {
    padding: 0.75rem 1.5rem;
  }
</style>
