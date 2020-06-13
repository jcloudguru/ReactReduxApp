import * as types from "../actions/actionTypes";
import initialStat from "./initialState";

// remember, all REDUCERS, will accept - State and Action - returns the NEW State

export default function authorReducer(state = initialStat.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      //state.push(action.course); // DONOT do this, because STATES are Immutable
      return action.authors;
    default:
      return state;
  }
}

// Checkout - Normalizing Redux State Shape, in REDUX DOCS
// Remember - Each reducer handles a "slice" of State. (a portion of the entire Redux Store)
