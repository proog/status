export const setSites = sites => ({ type: "SET_SITES", sites });

export function refresh() {
  return (dispatch, getState) => {
    const { sites, webtask, interval } = getState();

    for (const site of sites) {
      site.status = -1;
      dispatch(setSites([...sites]));

      fetch(webtask + "?url=" + encodeURIComponent(site.url))
        .then(res => res.json())
        .then(data => {
          site.status = data.status;
          site.elapsed = data.elapsed;
          dispatch(setSites([...sites]));
        })
        .catch(() => {
          site.status = 0;
          site.elapsed = 0;
          dispatch(setSites([...sites]));
        });
    }

    if (interval) {
      dispatch({ type: "RESET_COUNTDOWN" });
    }
  };
}

export function startInterval() {
  return (dispatch, getState) => {
    const interval = setInterval(() => {
      const { countdown } = getState();
      dispatch({ type: "DECREMENT_COUNTDOWN" });

      if (countdown - 1 === 0) {
        dispatch(refresh());
      }
    }, 1000);

    dispatch({ type: "SET_INTERVAL", interval });
  };
}

export function stopInterval() {
  return (dispatch, getState) => {
    const { interval } = getState();
    clearInterval(interval);
    dispatch({ type: "CLEAR_INTERVAL" });
  };
}
