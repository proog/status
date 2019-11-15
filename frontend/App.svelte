<script>
  import _ from "lodash";
  import { onMount } from "svelte";
  import StatusTile from "./StatusTile.svelte";
  import AppControls from "./AppControls.svelte";
  import config from "./config.json";

  const title = config.title;
  const webtask = config.webtask;
  const refreshInterval = config.interval;
  let countdown = refreshInterval;
  let interval;
  let sites = _.orderBy(config.sites, "name").map(site => ({
    name: site.name,
    url: site.url,
    status: -1,
    elapsed: 0
  }));

  onMount(() => {
    document.title = title;
    startInterval();
    refresh();
  });

  $: anyLoading = sites.some(site => site.status === -1);

  function refresh() {
    for (const site of sites) {
      site.status = -1;
      sites = sites; // make svelte react

      fetch(webtask + "?url=" + encodeURIComponent(site.url))
        .then(res => res.json())
        .then(data => {
          site.status = data.status;
          site.elapsed = data.elapsed;
        })
        .catch(() => {
          site.status = 0;
          site.elapsed = 0;
        })
        .then(() => {
          sites = sites; // make svelte react
        });
    }

    if (interval) {
      countdown = refreshInterval;
    }
  }

  function startInterval() {
    interval = setInterval(() => {
      countdown -= 1;

      if (countdown === 0) {
        refresh();
      }
    }, 1000);
  }

  function stopInterval() {
    clearInterval(interval);
    interval = null;
  }
</script>

<div class="w-100 avenir">
  <div class="flex flex-wrap justify-between items-center pa2 bb b--light-gray">
    <h3 class="mv0">{title}</h3>
    <div class="tr">
      <AppControls
        paused="{!interval}"
        countdown="{countdown}"
        loading="{anyLoading}"
        on:refresh="{refresh}"
        on:pause="{stopInterval}"
        on:resume="{startInterval}"
      ></AppControls>
    </div>
  </div>
  <div class="flex flex-wrap">
    {#each sites as site}
    <div class="w-100 w-50-m w-25-l pa2">
      <StatusTile
        name="{site.name}"
        url="{site.url}"
        status="{site.status}"
        elapsed="{site.elapsed}"
      ></StatusTile>
    </div>
    {/each}
  </div>
</div>
