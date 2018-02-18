import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Hope you voted!</div>;
  }
}

export default connect(null, actions)(Signout);
