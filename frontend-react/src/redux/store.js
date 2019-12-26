import _ from "lodash";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import config from "../config.json";

const title = config.title;
const webtask = config.webtask;
const refreshInterval = config.interval;
const sites = _.orderBy(config.sites, "name").map(site => ({
  name: site.name,
  url: site.url,
  status: -1,
  elapsed: 0
}));
const initialState = {
  countdown: refreshInterval,
  sites: sites,
  title: title,
  webtask: webtask,
  refreshInterval: refreshInterval,
  anyLoading: false,
  interval: null
};

export default createStore(rootReducer, initialState, applyMiddleware(thunk));
