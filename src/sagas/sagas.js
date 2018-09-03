import { takeLatest, call, put, all } from "redux-saga/effects"
import axios from "axios"
import * as actions from "../actions/actions"

//constants
const PROXY_URL = "http://localhost:8080/"
const FPL_BOOTSTRAP_STATIC_URL = "https://fantasy.premierleague.com/drf/bootstrap-static"
const FPL_PLAYER_URL = "https://fantasy.premierleague.com/drf/element-summary/"

//rootSaga with all watchers
export function* rootSaga() {
  yield all([
    watchFetchDataOnLoad(),
    watchFetchPlayer(),
  ])
}

// watcher saga for initial request action
function* watchFetchDataOnLoad() {
  yield takeLatest(actions.INIT_API_REQUEST, workerFetchDataOnLoad);
}

// watcher saga for player request action
function* watchFetchPlayer() {
  yield takeLatest(actions.FETCH_PLAYER, workerFetchPlayer);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerFetchDataOnLoad() {
  try {
    const response = yield call(fetchDataOnLoad);
    yield put({ type: actions.INIT_API_REQUEST_SUCCESS, response });
  
  } catch (error) {
    yield put({ type: actions.INIT_API_REQUEST_FAILURE, error });
  }
}

// worker saga: makes the api call for a single player given their id
function* workerFetchPlayer(action) {
  try {
    const response = yield call(fetchPlayer, action.playerId);
    yield put({ type: actions.FETCH_PLAYER_SUCCESS, response });
  
  } catch (error) {
    yield put({ type: actions.FETCH_PLAYER_FAILURE, error });
  }
}

// fetch request: get initial data
function fetchDataOnLoad() {
 return axios({
    method: "GET",
    url: `${PROXY_URL}${FPL_BOOTSTRAP_STATIC_URL}`
  })
}

// fetch request: get player data given id
function fetchPlayer(playerId) {
  return axios({
     method: "GET",
     url: `${PROXY_URL}${FPL_PLAYER_URL}${playerId}`
   })
 }
