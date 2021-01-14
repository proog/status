<template>
  <div class="w-full avenir">
    <div class="flex flex-wrap justify-between items-center p-2 border shadow">
      <h3 class="my-0">{{ title }}</h3>
      <div class="text-right">
        <AppControls></AppControls>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div
        class="w-full p-3 md:w-1/2 lg:w-1/3 xl:w-1/4"
        v-for="site in sites"
        :key="site.url"
      >
        <StatusTile
          :name="site.name"
          :url="site.url"
          :status="site.status"
          :elapsed="site.elapsed"
        ></StatusTile>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StatusTile from "./StatusTile.vue";
import AppControls from "./AppControls.vue";

export default {
  mounted() {
    document.title = this.$store.state.title;
    this.$store.dispatch("resume");
    this.$store.dispatch("refresh");
  },
  computed: mapState({
    title: "title",
    sites: "sites",
  }),
  components: { StatusTile, AppControls },
};
</script>
