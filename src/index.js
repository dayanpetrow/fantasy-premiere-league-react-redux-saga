import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";
import { reducer } from "./reducers/reducer";
import { rootSaga } from "./sagas/sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
