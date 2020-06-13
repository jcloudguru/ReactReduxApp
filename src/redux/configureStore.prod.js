import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
// The above is a Redux Middleware
// All theses file content is setup only once - and forget it...dont worry

import thunk from "redux-thunk";
// THUNK is a popular middleware

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk) // This will warn us if we accedentially mutate Redux State.
  );
}
