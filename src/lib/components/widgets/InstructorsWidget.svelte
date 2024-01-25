<script lang="ts">
  import DataWrapper from "$lib/data/data-wrapper";
  import type { Instructors } from "$lib/peloton/instructors";
  import { sumOf } from "$lib/util/math";

  export let instructors: Instructors;

  $: wrapper = new DataWrapper(instructors);
  $: rows = wrapper.getRows();
</script>

<table>
  <thead>
    <tr>
      <th on:click={() => wrapper.sort("name")}>Instructor</th>
      <th on:click={() => wrapper.sort("classes")}>Classes</th>
    </tr>
  </thead>
  <tbody>
    {#each $rows as row}
      <tr>
        <td>{row.name}</td>
        <td>{row.classes}</td>
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      <th>{sumOf(instructors, "classes").classes}</th>
    </tr>
  </tfoot>
</table>
