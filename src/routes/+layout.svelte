<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import { error } from "$lib/stores";
  import "../app.css";
</script>

<Header />
<main>
  {#if $error}
    <div class="alert">{$error}</div>
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
