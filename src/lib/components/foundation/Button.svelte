<script lang="ts">
  export let type: HTMLButtonElement["type"] = "button";
</script>

<button class={$$restProps.class} {type} on:click>
  <slot />
</button>

<style>
  button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--primary);
    font-size: 1rem;
    color: var(--background);
    border: 0;
    border-radius: 0.4rem;
    cursor: pointer;
  }

  button:hover {
    background: var(--primary-80);
  }
</style>
