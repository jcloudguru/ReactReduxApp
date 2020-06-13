import * as types from "../actions/actionTypes";
import initialStat from "./initialState";

// remember, all REDUCERS, will accept - State and Action - returns the NEW State

export default function courseReducer(state = initialStat.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      //state.push(action.course); // DONOT do this, because STATES are Immutable
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state;
  }
}

// Checkout - Normalizing Redux State Shape, in REDUX DOCS
// Remember - Each reducer handles a "slice" of State. (a portion of the entire Redux Store)
