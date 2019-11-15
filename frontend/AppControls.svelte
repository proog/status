<script>
  import _ from "lodash";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let countdown, paused, loading;

  $: zeroPadCountdown = _.padStart(`${countdown}`, 2, "0");

  function refresh() {
    dispatch("refresh");
  }

  function toggle() {
    if (paused) dispatch("resume");
    else dispatch("pause");
  }
</script>

<div>
  {zeroPadCountdown}
  <button
    type="button"
    class="ph3 pv2 ba b--light-gray bg-transparent hover-bg-light-gray"
    on:click="{toggle}"
  >
    {#if paused}
    <i class="fas fa-play"></i>
    {:else}
    <i class="fas fa-pause"></i>
    {/if}
  </button>
  <button
    type="button"
    class="ph3 pv2 ba b--light-gray bg-transparent hover-bg-light-gray"
    on:click="{refresh}"
  >
    <i class="fas fa-sync-alt" class:fa-pulse="{loading}"></i>
  </button>
</div>
