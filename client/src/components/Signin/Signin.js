import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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
      <form
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      >
        <div>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Email"
            className="form-group"
          />
        </div>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="password"
            className="form-group"
          />
        </div>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
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