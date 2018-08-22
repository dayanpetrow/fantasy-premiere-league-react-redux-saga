import { takeLatest, call, put, all } from "redux-saga/effects"
import axios from "axios"
import * as actions from "../actions/actions"

export function* rootSaga() {
  yield all([
    watchFetchDataOnLoad(),
  ])
}

const PROXY_URL = "http://localhost:8080/"
const FPL_BOOTSTRAP_STATIC_URL = "https://fantasy.premierleague.com/drf/bootstrap-static"

function* watchFetchDataOnLoad() {
  yield takeLatest(actions.INIT_API_REQUEST, workerFetchDataOnLoad);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerFetchDataOnLoad() {
  try {
    const response = yield call(fetchDataOnLoad);
    // console.log(response)

    // dispatch a success action to the store with the response
    yield put({ type: actions.INIT_API_REQUEST_SUCCESS, response });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: actions.INIT_API_REQUEST_FAILURE, error });
  }
}

/* ======== fetch */
function fetchDataOnLoad() {
 return axios({
    method: "GET",
    url: `${PROXY_URL}${FPL_BOOTSTRAP_STATIC_URL}`
  })
}