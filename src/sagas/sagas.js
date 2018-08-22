import { takeLatest, call, put } from "redux-saga/effects"
import axios from "axios"
import { 
    INIT_API_REQUEST, INIT_API_REQUEST_SUCCESS, INIT_API_REQUEST_FAILURE 
} from "../actions/actions"

export function* rootSaga() {
  yield takeLatest(INIT_API_REQUEST, workerFetchDataOnLoad);
}

const PROXY_URL = "http://localhost:8080/"
const FPL_BOOTSTRAP_STATIC_URL = "https://fantasy.premierleague.com/drf/bootstrap-static"

// worker saga: makes the api call when watcher saga sees the action
function* workerFetchDataOnLoad() {
  try {
    const response = yield call(fetchDataOnLoad);
    console.log(response)

    // dispatch a success action to the store with the response
    yield put({ type: INIT_API_REQUEST_SUCCESS, response });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: INIT_API_REQUEST_FAILURE, error });
  }
}


/* ======== fetch */
function fetchDataOnLoad() {
 return axios({
    method: "GET",
    url: `${PROXY_URL}${FPL_BOOTSTRAP_STATIC_URL}`
  })
}