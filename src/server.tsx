import * as React from "react";

import { renderToString } from "react-dom/server";

import { Provider, useDispatch } from "react-redux";
import { initialState } from "./redux/slice";

import { App } from "./components/app";
import initStore from "./redux/store";

module.exports = function render(initialState: any) {
  // Configure the store with the initial state provided
  const store = initStore(initialState);

  // render the App store static markup ins content variable
  let content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Get a copy of store data to create the same store on client side
  const preloadedState = store.getState();

  return { content, preloadedState };
};
