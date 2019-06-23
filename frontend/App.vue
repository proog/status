<template>
  <div class="w-100 avenir">
    <div class="flex flex-wrap justify-between items-center pa2 bb b--light-gray">
      <h3 class="mv0">{{ title }}</h3>
      <div class="tr">
        <AppControls
          :paused="!interval"
          :countdown="countdown"
          :loading="anyLoading"
          @refresh="refresh"
          @pause="stopInterval"
          @resume="startInterval"
        ></AppControls>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-100 w-50-m w-25-l pa2" v-for="site in sites" :key="site.url">
        <StatusTile :name="site.name" :url="site.url" :status="site.status" :elapsed="site.elapsed"></StatusTile>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import StatusTile from "./StatusTile.vue";
import AppControls from "./AppControls.vue";
import config from "./config.json";

const title = config.title;
const webtask = config.webtask;
const refreshInterval = config.interval;
const sites = _.orderBy(config.sites, "name").map(site => ({
  name: site.name,
  url: site.url,
  status: -1,
  elapsed: 0
}));

export default {
  data() {
    return {
      sites: sites,
      countdown: refreshInterval,
      title: title,
      interval: null
    };
  },
  mounted() {
    document.title = this.title;
    this.startInterval();
    this.refresh();
  },
  computed: {
    anyLoading() {
      return this.sites.some(site => site.status === -1);
    }
  },
  methods: {
    refresh() {
      for (const site of this.sites) {
        site.status = -1;
        fetch(webtask + "?url=" + encodeURIComponent(site.url))
          .then(res => res.json())
          .then(data => {
            site.status = data.status;
            site.elapsed = data.elapsed;
          })
          .catch(() => {
            site.status = 0;
            site.elapsed = 0;
          });
      }

      if (this.interval) {
        this.countdown = refreshInterval;
      }
    },
    startInterval() {
      this.interval = setInterval(() => {
        this.countdown -= 1;

        if (this.countdown === 0) {
          this.refresh();
        }
      }, 1000);
    },
    stopInterval() {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  components: { StatusTile, AppControls }
};
</script>
