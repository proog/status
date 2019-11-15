<script>
  import _ from "lodash";

  export let name, url, status, elapsed;

  function getStatusText(status) {
    switch (status) {
      case -1:
        return "...";
      case 0:
        return "Connection failed";
      default:
        return `${status}`;
    }
  }

  $: statusText = getStatusText(status);
  $: prettyUrl = _.trimEnd(url, "/").replace(/https?:\/\//i, "");
  $: isLoading = status === -1;
  $: isSuccess = status >= 200 && status < 400;
  $: isWarning = status >= 400 && status < 500;
  $: isError = status === 0 || status >= 500;
  $: isUnknown = status > 0 && status < 200;
</script>

<a
  class="db h-100 pa2 ba b--light-gray black no-underline shadow-hover"
  target="_blank"
  rel="noopener noreferrer"
  href="{url}"
>
  <div
    class="flex justify-between bb b--gray animate"
    class:b--green="{isSuccess}"
    class:b--gold="{isWarning}"
    class:b--red="{isError}"
  >
    <div>{name}</div>

    {#if isLoading}
    <div>{elapsed} ms</div>
    {/if}
  </div>
  <div class="tc">
    <div
      class="mv3 animate"
      class:green="{isSuccess}"
      class:gold="{isWarning}"
      class:red="{isError}"
    >
      <div class="f2">
        {#if isLoading}
        <i class="fas fa-spinner fa-pulse"></i>
        {:else if isSuccess}
        <i class="fas fa-check"></i>
        {:else if isWarning}
        <i class="fas fa-exclamation"></i>
        {:else if isError}
        <i class="fas fa-times"></i>
        {:else}
        <i class="fas fa-question"></i>
        {/if}
      </div>
      <div class="f5">{statusText}</div>
    </div>
    <p class="f7" title="{url}">{prettyUrl}</p>
  </div>
</a>
