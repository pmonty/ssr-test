import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/app";
import initStore from "./redux/store";

// Create a fresh store
const store = initStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
