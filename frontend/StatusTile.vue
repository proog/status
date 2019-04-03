<template>
  <div
    class="card shadow-sm h-100"
    :class="{'bg-success text-light': isSuccess, 'bg-warning': isWarning, 'bg-danger text-light': isError}"
  >
    <div class="card-header d-flex justify-content-between">
      <div>{{ name }}</div>
      <div v-if="!isLoading">{{ elapsed }} ms</div>
    </div>
    <div class="card-body text-center">
      <h1>
        <i class="fas fa-sync-alt fa-spin" v-if="isLoading"></i>
        <i class="far fa-laugh" v-else-if="isSuccess"></i>
        <i class="far fa-meh" v-else-if="isWarning"></i>
        <i class="far fa-dizzy" v-else-if="isError"></i>
        <i class="far fa-flushed" v-else></i>
      </h1>
      <h6 class="card-subtitle">{{ statusText }}</h6>
      <p class="small" :title="url">{{ prettyUrl }}</p>
    </div>
  </div>
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
          return "Loading...";
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
