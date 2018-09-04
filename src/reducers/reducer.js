import * as actions from "../actions/actions";

// reducer with initial state
const initialState = {
  fetching: false,
  response: null,
  error: null,
  view: null,
  fetching_player: false,
  player: null
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
    case actions.FETCH_PLAYER:
      return {
        ...state,
        fetching_player: true,
        error: null
      };
    case actions.FETCH_PLAYER_SUCCESS:
      return {
        ...state,
        fetching_player: false,
        player: action.response.data
      };
    case actions.FETCH_PLAYER_FAILURE:
      return {
        ...state,
        fetching_player: false,
        player: null,
        error: action.error
      };
    case action.CLEAR_FETCHED_PLAYER:
      return {
        ...state,
        player: null
      };
    default:
      return state;
  }
}
