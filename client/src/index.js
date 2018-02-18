import React from "react";
import registerServiceWorker from "./registerServiceWorker";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { Router } from 'react-router'
import reduxThunk from "redux-thunk";
import reducers from "./store/reducers";
import history from "./utils/history";
import { AUTH_USER } from "./store/actions/types";

import App from "./App";

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
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
