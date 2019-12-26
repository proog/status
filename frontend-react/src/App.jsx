import React from "react";
import AppControls from "./AppControls";
import StatusTile from "./StatusTile";
import { connect } from "react-redux";
import { startInterval, refresh } from "./redux/actions";

class App extends React.Component {
  componentDidMount() {
    document.title = this.props.title;
    this.props.onStartInterval();
    this.props.onRefresh();
  }

  render() {
    return (
      <div className="w-100 avenir">
        <div className="flex flex-wrap justify-between items-center pa2 bb b--light-gray">
          <h3 className="mv0">{this.props.title}</h3>
          <div className="tr">
            <AppControls />
          </div>
        </div>
        <div className="flex flex-wrap">
          {this.props.sites.map(site => (
            <div className="w-100 w-50-m w-25-l pa2" key={site.url}>
              <StatusTile
                name={site.name}
                url={site.url}
                status={site.status}
                elapsed={site.elapsed}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sites: state.sites,
    title: state.title
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRefresh: () => dispatch(refresh()),
    onStartInterval: () => dispatch(startInterval())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
