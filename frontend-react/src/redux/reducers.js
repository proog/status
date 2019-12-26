function rootReducer(state, action) {
  switch (action.type) {
    case "SET_SITES":
      return {
        ...state,
        sites: action.sites,
        anyLoading: action.sites.some(site => site.status === -1)
      };
    case "DECREMENT_COUNTDOWN":
      return { ...state, countdown: state.countdown - 1 };
    case "RESET_COUNTDOWN":
      return { ...state, countdown: state.refreshInterval };
    case "SET_INTERVAL":
      return { ...state, interval: action.interval };
    case "CLEAR_INTERVAL":
      return { ...state, interval: null };
    case "SET_WEBTASK":
      return { ...state, webtask: action.webtask };
    default:
      return { ...state };
  }
}

export default rootReducer;
