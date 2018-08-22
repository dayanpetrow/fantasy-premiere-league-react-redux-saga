import * as actions from "../actions/actions";
import {HOME_PAGE} from '../constants/urls'

// reducer with initial state
const initialState = {
  fetching: false,
  response: null,
  error: null,
  view: HOME_PAGE
};

export function reducer(state = initialState, action) {
  console.log("reducer", action);
  switch (action.type) {
    case actions.INIT_API_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case actions.INIT_API_REQUEST_SUCCESS:
      return {
        ...state,
        fetching: false,
        response: action.response.data
      };
    case actions.INIT_API_REQUEST_FAILURE:
      return {
        ...state,
        fetching: false,
        response: null,
        error: action.error
      };
    case actions.CHANGE_ACTIVE_VIEW:
      return {
        ...state,
        view: action.activeView
      };
    default:
      return state;
  }
}
