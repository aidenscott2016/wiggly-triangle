import React from "react";

export class RenderOnce extends React.Component {
  shouldComponentUpdate = () => false;
  render() {
    return <>{this.props.children}</>;
  }
}
