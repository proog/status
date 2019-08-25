import React from "react";
import AppControls from "./AppControls";
import StatusTile from "./StatusTile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 60,
      anyLoading: false,
      sites: props.sites
    };
  }

  componentDidMount() {
    document.title = this.title;
    this.startInterval();
    this.refresh();
  }

  render() {
    return (
      <div className="w-100 avenir">
        <div className="flex flex-wrap justify-between items-center pa2 bb b--light-gray">
          <h3 className="mv0">{this.props.title}</h3>
          <div className="tr">
            <AppControls
              paused={!this.state.interval}
              countdown={this.state.countdown}
              loading={this.anyLoading}
              onRefresh={() => this.refresh()}
              onPause={() => this.stopInterval()}
              onResume={() => this.startInterval()}
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          {this.state.sites.map(site => (
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

  refresh() {
    for (const site of this.state.sites) {
      site.status = -1;
      fetch(this.props.webtask + "?url=" + encodeURIComponent(site.url))
        .then(res => res.json())
        .then(data => {
          site.status = data.status;
          site.elapsed = data.elapsed;
          this.setState({ sites: this.state.sites });
        })
        .catch(() => {
          site.status = 0;
          site.elapsed = 0;
          this.setState({ sites: this.state.sites });
        });
    }

    this.setState(state => ({
      countdown: state.interval ? 60 : state.countdown
    }));
  }

  startInterval() {
    const interval = setInterval(() => {
      const countdown = this.state.countdown - 1;
      this.setState({ countdown });

      if (countdown === 0) {
        this.refresh();
      }
    }, 1000);

    this.setState({ interval });
  }

  stopInterval() {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  }

  get anyLoading() {
    return this.state.sites.some(site => site.status === -1);
  }
}

export default App;
