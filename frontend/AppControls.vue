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
import _ from "lodash";

export default {
  props: {
    countdown: Number,
    paused: Boolean,
    loading: Boolean
  },
  computed: {
    zeroPadCountdown() {
      return _.padStart(`${this.countdown}`, 2, "0");
    }
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    },
    toggle() {
      this.$emit(this.paused ? "resume" : "pause");
    }
  }
};
</script>
