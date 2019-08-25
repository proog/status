import _ from "lodash";
import React from "react";

export default class StatusTile extends React.Component {
  render() {
    const titleLine = this.color ? "b--" + this.color : "";
    return (
      <a
        className="db h-100 pa2 ba b--light-gray black no-underline shadow-hover"
        target="_blank"
        rel="noopener noreferrer"
        href={this.props.url}
      >
        <div className={"flex justify-between bb b--gray animate " + titleLine}>
          <div>{this.props.name}</div>
          {!this.isLoading && <div>{this.props.elapsed} ms</div>}
        </div>
        <div className="tc">
          <div className={"mv3 animate " + this.color}>
            <div className="f2">{this.icon}</div>
            <div className="f5">{this.statusText}</div>
          </div>
          <p className="f7" title={this.props.url}>
            {this.prettyUrl}
          </p>
        </div>
      </a>
    );
  }

  get color() {
    if (this.isSuccess) return "green";
    if (this.isWarning) return "gold";
    if (this.isError) return "red";
    return "";
  }
  get icon() {
    if (this.isLoading) return <i className="fas fa-spinner fa-pulse" />;
    if (this.isSuccess) return <i className="fas fa-check" />;
    if (this.isWarning) return <i className="fas fa-exclamation" />;
    if (this.isError) return <i className="fas fa-times" />;
    return <i className="fas fa-question" />;
  }
  get prettyUrl() {
    return _.trimEnd(this.url, "/").replace(/https?:\/\//i, "");
  }
  get statusText() {
    switch (this.props.status) {
      case -1:
        return "...";
      case 0:
        return "Connection failed";
      default:
        return `${this.props.status}`;
    }
  }
  get isLoading() {
    return this.props.status === -1;
  }
  get isSuccess() {
    return this.props.status >= 200 && this.props.status < 400;
  }
  get isWarning() {
    return this.props.status >= 400 && this.props.status < 500;
  }
  get isError() {
    return this.props.status === 0 || this.props.status >= 500;
  }
}
