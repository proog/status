import _ from "lodash";
import React from "react";

export default function AppControls(props) {
  const zeroPadCountdown = _.padStart(`${props.countdown}`, 2, "0");
  const refreshClassName = props.loading
    ? "fas fa-sync-alt fa-pulse"
    : "fas fa-sync-alt";

  return (
    <div>
      {zeroPadCountdown}
      <button
        type="button"
        className="ph3 pv2 ba b--light-gray bg-transparent hover-bg-light-gray"
        onClick={() => (props.paused ? props.onResume() : props.onPause())}
      >
        <i className={props.paused ? "fas fa-play" : "fas fa-pause"} />
      </button>
      <button
        type="button"
        className="ph3 pv2 ba b--light-gray bg-transparent hover-bg-light-gray"
        onClick={() => props.onRefresh()}
      >
        <i className={refreshClassName} />
      </button>
    </div>
  );
}
