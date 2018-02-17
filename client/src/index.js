import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./store/reducers";
import { AUTH_USER } from "./store/actions/types";

import Signin from "./components/Signin/Signin";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(reduxThunk))(
  createStore
);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("token");

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
