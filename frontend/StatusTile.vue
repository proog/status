<template>
  <a
    class="block h-full p-2 border no-underline shadow hover:shadow-lg animate"
    target="_blank"
    rel="noopener noreferrer"
    :href="url"
  >
    <div
      class="flex justify-between border-b rounded animate"
      :class="{
        'border-green-500': isSuccess,
        'border-yellow-500': isWarning,
        'border-red-500': isError,
        'border-gray-500': !isSuccess && !isWarning && !isError,
      }"
    >
      <div>{{ name }}</div>
      <div v-if="!isLoading">{{ elapsed }} ms</div>
    </div>
    <div class="text-center">
      <div
        class="my-4 animate"
        :class="{
          'text-green-500': isSuccess,
          'text-yellow-500': isWarning,
          'text-red-500': isError,
        }"
      >
        <div class="text-3xl">
          <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
          <i class="fas fa-check" v-else-if="isSuccess"></i>
          <i class="fas fa-exclamation" v-else-if="isWarning"></i>
          <i class="fas fa-times" v-else-if="isError"></i>
          <i class="fas fa-question" v-else></i>
        </div>
        <div class="text-xl">{{ statusText }}</div>
      </div>
      <p class="text-xs" :title="url">{{ prettyUrl }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    name: String,
    url: String,
    status: Number,
    elapsed: Number,
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
      const url = this.url.endsWith("/") ? this.url.slice(0, -1) : this.url;
      return url.replace(/https?:\/\//i, "");
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
    },
  },
};
</script>
