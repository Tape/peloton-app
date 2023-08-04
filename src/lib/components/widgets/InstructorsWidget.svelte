<script lang="ts">
  import type { Instructors } from "$lib/peloton/instructors";

  export let instructors: Instructors;
</script>

<table>
  <thead>
    <tr>
      <th>Instructor</th>
      <th>Classes</th>
    </tr>
  </thead>
  <tbody>
    {#each instructors as [instructor, classCount]}
      <tr>
        <td>{instructor}</td>
        <td>{classCount}</td>
      </tr>
    {/each}
  </tbody>
</table>
