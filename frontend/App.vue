<template>
  <div class="w-100 avenir">
    <div class="flex flex-wrap justify-between items-center pa2 bb b--light-gray">
      <h3 class="mv0">{{ title }}</h3>
      <div class="tr">
        <AppControls></AppControls>
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
    sites: "sites"
  }),
  components: { StatusTile, AppControls }
};
</script>
