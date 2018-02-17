import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from "./types";

const ROOT_URL = "http://localhost:8080";

export function signinUser({ name, email, password, ssn, pin }) {
  return function(dispatch) {
    axios
      .post(`/signin`, { name, email, password, ssn, pin })
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem("token", response.data.token);

        BrowserRouter.push("/feature");
      })
      .catch(error => {
        dispatch(authError("Bad Login Info"));
      });
  };
}

export function signupUser({ name, email, password, ssn, pin }) {
  return function(dispatch) {
    axios
      .post(`/signup`, { name, email, password, ssn, pin })
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem("token", response.data.token);

        BrowserRouter.push("/feature");
      })
      .catch(error => {
        console.log(error);
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
