import { INIT_API_REQUEST, INIT_API_REQUEST_SUCCESS, INIT_API_REQUEST_FAILURE } from "../actions/actions"

// reducer with initial state
const initialState = {
  fetching: false,
  dog: null,
  error: null
};

export function reducer(state = initialState, action) {
    console.log('reducer', action)
  switch (action.type) {
    case INIT_API_REQUEST:
      return { ...state, fetching: true, error: null };
    case INIT_API_REQUEST_SUCCESS:
      return { ...state, fetching: false, response: action.response };
    case INIT_API_REQUEST_FAILURE:
      return { ...state, fetching: false, response: null, error: action.error };
    default:
      return state;
  }
}