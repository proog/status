import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import config from "./config.json";

const title = config.title;
const webtask = config.webtask;
const refreshInterval = config.interval;
const sites = _.orderBy(config.sites, "name").map(site => ({
  name: site.name,
  url: site.url,
  status: -1,
  elapsed: 0
}));

ReactDOM.render(
  <App
    title={title}
    webtask={webtask}
    refreshInterval={refreshInterval}
    sites={sites}
  />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
