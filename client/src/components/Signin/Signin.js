import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import classes from "./Signin.css";

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className={classes.AlertOn}>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    } else {
      return <div className={classes.AlertOff}></div>
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={classes.Container}>
        <h1>Please Sign In</h1>
        <form className={classes.Form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h4 className={classes.Label}>Email:</h4>
          <div>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="you@email.com"
              className={classes.Input}
            />
          </div>
          <h4 className={classes.Label}>Password:</h4>
          <div>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="enter password"
              className={classes.Input}
            />
          </div>
          {this.renderAlert()}
          <button action="submit" className={classes.Button}>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

Signin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
  form: "signin"
})(Signin);
