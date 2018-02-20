import axios from "axios";
import history from "../../utils/history";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from "./types";

export function signinUser({ name, email, password, ssn, pin }) {
  return function(dispatch) {
    axios
      .post(`/api/signin`, { name, email, password, ssn, pin })
      .then(response => {
        // console.log(response);
        dispatch({ type: AUTH_USER, payload: response.data.user });

        localStorage.setItem("token", response.data.token);

        history.push("/ballot");
      })
      .catch(error => {
        dispatch(authError("Bad Login Info"));
      });
  };
}

export function signupUser({ name, email, password, ssn, pin }) {
  return function(dispatch) {
    axios
      .post(`/api/signup`, { name, email, password, ssn, pin })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data.user });

        localStorage.setItem("token", response.data.token);

        history.push("/ballot");
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem("token");
  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get("/", {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
