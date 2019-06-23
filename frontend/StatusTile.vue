<template>
  <a
    class="db h-100 pa2 ba b--light-gray black no-underline shadow-hover grow"
    target="_blank"
    rel="noopener noreferrer"
    :href="url"
  >
    <div
      class="flex justify-between bb b--gray animate"
      :class="{'b--green': isSuccess, 'b--gold': isWarning, 'b--red': isError}"
    >
      <div>{{ name }}</div>
      <div v-if="!isLoading">{{ elapsed }} ms</div>
    </div>
    <div class="tc">
      <div class="mv3 animate" :class="{'green': isSuccess, 'gold': isWarning, 'red': isError}">
        <div class="f2">
          <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
          <i class="fas fa-check" v-else-if="isSuccess"></i>
          <i class="fas fa-exclamation" v-else-if="isWarning"></i>
          <i class="fas fa-times" v-else-if="isError"></i>
          <i class="fas fa-question" v-else></i>
        </div>
        <div class="f5">{{ statusText }}</div>
      </div>
      <p class="f7" :title="url">{{ prettyUrl }}</p>
    </div>
  </a>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    name: String,
    url: String,
    status: Number,
    elapsed: Number
  },
  computed: {
    statusText() {
      switch (this.status) {
        case -1:
          return "...";
        case 0:
          return "Connection failed";
        default:
          return `${this.status}`;
      }
    },
    prettyUrl() {
      return _.trimEnd(this.url, "/").replace(/https?:\/\//i, "");
    },
    isLoading() {
      return this.status === -1;
    },
    isSuccess() {
      return this.status >= 200 && this.status < 400;
    },
    isWarning() {
      return this.status >= 400 && this.status < 500;
    },
    isError() {
      return this.status === 0 || this.status >= 500;
    },
    isUnknown() {
      return this.status > 0 && this.status < 200;
    }
  }
};
</script>
