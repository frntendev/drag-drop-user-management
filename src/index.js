import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/";
import App from "./components/App";
import Notification from "./components/Notification";
const loggerMiddleware = createLogger();
const enhancers = [];
const devToolsExtension = window.devToolsExtension;

if (typeof devToolsExtension === "function") {
  enhancers.push(devToolsExtension());
}
export const composedEnhancers = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  ...enhancers
);
export const store = createStore(rootReducer, composedEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Notification />
      <App />
    </div>
  </Provider>,
  document.getElementById("root")
);

