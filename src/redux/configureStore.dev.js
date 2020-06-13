import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
// The above is a Redux Middleware
// All theses file content is setup only once - and forget it...dont worry

import thunk from "redux-thunk";
// THUNK is a popular middleware

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools.
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())) // This will warn us if we accedentially mutate Redux State.
  );
}
