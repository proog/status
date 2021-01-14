import Vue from "vue";
import Vuex from "vuex";
import config from "./config.json";

const title = config.title;
const webtask = config.webtask;
const refreshInterval = config.interval;
const sites = config.sites
  .map(site => ({
    name: site.name,
    url: site.url,
    status: -1,
    elapsed: 0
  }))
  .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: title,
    sites: sites,
    countdown: refreshInterval,
    interval: null
  },
  mutations: {
    decrementCountdown(state) {
      state.countdown -= 1;
    },
    resetCountdown(state) {
      state.countdown = refreshInterval;
    },
    setInterval(state, interval) {
      state.interval = interval;
    }
  },
  getters: {
    paused(state) {
      return !state.interval;
    },
    anyLoading(state) {
      return state.sites.some(site => site.status === -1);
    }
  },
  actions: {
    resume({ state, commit, dispatch }) {
      const interval = setInterval(() => {
        commit("decrementCountdown");

        if (state.countdown === 0) {
          dispatch("refresh");
        }
      }, 1000);

      commit("setInterval", interval);
    },
    pause({ state, commit }) {
      clearInterval(state.interval);
      commit("setInterval", null);
    },
    refresh({ state, commit }) {
      for (const site of state.sites) {
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

      if (state.interval) {
        commit("resetCountdown");
      }
    }
  }
});
