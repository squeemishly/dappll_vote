import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./App.css";
import Ballot from "./components/Ballot/Ballot";
import Layout from "./components/UI/Layout/Layout";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Signout from "./components/Signout/Signout";
import require_auth from "./components/hoc/require_auth/require_auth";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signout" exact component={Signout} />
        <Route path="/ballot" exact component={Ballot} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className={classes.Body}>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(App));
