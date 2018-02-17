import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        (error && (
          <div className="error">
            <span>{error}</span>
          </div>
        ))}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please Enter an Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
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
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <div>
            <label>Name: </label>
            <Field
              name="name"
              component={renderField}
              type="text"
              placeholder="Name"
              className="form-control"
            />
          </div>
          <label>Email: </label>
          <Field
            name="email"
            component={renderField}
            type="text"
            placeholder="Email"
            className="form-control"
          />
        </div>
        <div>
          <label>Password: </label>
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div>
          <label>Confirm Password: </label>
          <Field
            name="passwordConfirm"
            component={renderField}
            type="password"
            placeholder="Confirm Password"
            className="form-control"
          />
        </div>
        <div>
          <label>SSN: </label>
          <Field
            name="ssn"
            component={renderField}
            type="text"
            placeholder="SSN"
            className="form-control"
          />
        </div>
        <div>
          <label>Pin: </label>
          <Field
            name="pin"
            component={renderField}
            type="text"
            placeholder="Pin"
            className="form-control"
          />
        </div>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
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
