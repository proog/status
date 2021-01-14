<template>
  <div>
    {{ zeroPadCountdown }}
    <button type="button" class="btn hover:bg-gray-100" @click="toggle">
      <i class="fas fa-play" v-if="paused"></i>
      <i class="fas fa-pause" v-else></i>
    </button>
    <button type="button" class="btn hover:bg-gray-100" @click="refresh">
      <i class="fas fa-sync-alt" :class="{ 'fa-pulse': loading }"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    zeroPadCountdown() {
      return `${this.$store.state.countdown}`.padStart(2, "0");
    },
    ...mapGetters({
      loading: "anyLoading",
      paused: "paused",
    }),
  },
  methods: {
    refresh() {
      this.$store.dispatch("refresh");
    },
    toggle() {
      this.$store.dispatch(this.paused ? "resume" : "pause");
    },
  },
};
</script>
