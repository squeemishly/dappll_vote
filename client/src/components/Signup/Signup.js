import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import classes from "./Signup.css";

const renderError = (error, touched) => {
  if (touched && error) {
    return (
      <div className={classes.Error}>
        <span className={classes.AlertOn}>{error}</span>
      </div>
    );
  } else {
    return <div className={classes.ErrorPlaceholder}></div>;
  }
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        className={classes.Input}
        {...input}
        placeholder={label}
        type={type}
      />
      {renderError(error, touched)}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Please Enter a Name";
  }
  if (!values.email) {
    errors.email = "Please Enter an Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.ssn) {
    errors.ssn = "Please Enter a Social Security Number";
  }
  if (!values.pin) {
    errors.pin = "Please Enter a Pin Number";
  }
  if (!values.password) {
    errors.password = "Please Enter a Password";
  } else if (values.password !== values.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Please Enter a Password Confirmation";
  }
  return errors;
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className={classes.AlertOn}>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    } else {
      return <div className={classes.AlertOff} />;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={classes.Container}>
        <h1>Please Sign Up</h1>
        <form
          className={classes.Form}
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <div className={classes.SignupContainer}>
            <div className={classes.FormColumn}>
              <div>
                <h4 className={classes.Label}>Name: </h4>
                <Field
                  name="name"
                  component={renderField}
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <h4 className={classes.Label}>Email: </h4>
                <Field
                  name="email"
                  component={renderField}
                  type="text"
                  placeholder="Email"
                  className={classes.Input}
                />
              </div>
              <div>
                <h4 className={classes.Label}>SSN: </h4>
                <Field
                  name="ssn"
                  component={renderField}
                  type="text"
                  placeholder="SSN"
                  className={classes.Input}
                />
              </div>
            </div>
            <div className={classes.FormColumn}>
              <div>
                <div>
                  <h4 className={classes.Label}>Pin: </h4>
                  <Field
                    name="pin"
                    component={renderField}
                    type="text"
                    placeholder="Pin"
                    className={classes.Input}
                  />
                </div>
                <div>
                  <h4 className={classes.Label}>Password: </h4>
                  <Field
                    name="password"
                    component={renderField}
                    type="password"
                    placeholder="Password"
                    className={classes.Input}
                  />
                </div>
                <h4 className={classes.Label}>Confirm Password: </h4>
                <Field
                  name="passwordConfirm"
                  component={renderField}
                  type="password"
                  placeholder="Confirm Password"
                  className={classes.Input}
                />
              </div>
            </div>
          </div>
          {this.renderAlert()}
          <button action="submit" className={classes.Button}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
};

Signup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({ form: "signup", validate: validate })(Signup);
