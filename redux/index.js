// import { createStore } from "redux";
import reducers from "./reducers/reducers";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
// const store = createStore(reducers);
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(logger)
    // other store enhancers if any
  )
);
export default store;
