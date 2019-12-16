<template>
  <div>
    {{ zeroPadCountdown }}
    <button
      type="button"
      class="ph3 pv2 ba b--light-gray bg-transparent hover-bg-light-gray"
      @click="toggle"
    >
      <i class="fas fa-play" v-if="paused"></i>
      <i class="fas fa-pause" v-else></i>
    </button>
    <button
      type="button"
      class="ph3 pv2 ba b--light-gray bg-transparent hover-bg-light-gray"
      @click="refresh"
    >
      <i class="fas fa-sync-alt" :class="{'fa-pulse': loading}"></i>
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
      paused: "paused"
    })
  },
  methods: {
    refresh() {
      this.$store.dispatch("refresh");
    },
    toggle() {
      this.$store.dispatch(this.paused ? "resume" : "pause");
    }
  }
};
</script>
