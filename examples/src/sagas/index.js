import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { generateKeys } from '../api'
import createSagaMiddleware from 'redux-saga'

import {
  getSwarmLogsFromDb,
  addReduxSwarmLog,
  removeReduxSwarmLog
} from '../../../src/redux-swarmlog'

import {
  ADD_SONG_STORE,
  REMOVE_SONG_STORE,
  addSongStoreSucceeded,
  removeSongStoreSucceeded
} from '../actions/index'

export const sagaMiddleware = createSagaMiddleware(
  removeSongStore,
  addSongStore
)

function *addSongStore() {
  yield* takeEvery(ADD_SONG_STORE, getKeys)
}

function *getKeys(action) {
  let swarmLogMeta = action.swarmLogMeta || {}
  if (!action.swarmLogMeta.keys) {
    swarmLogMeta.keys = yield call(generateKeys)
    swarmLogMeta.id = `${swarmLogMeta.name.replace(/\s/g,'_')}-${swarmLogMeta.keys.public}`
  }
  yield addReduxSwarmLog(swarmLogMeta)
  yield put(addSongStoreSucceeded(swarmLogMeta))
}

function *removeSongStore() {
  yield* takeEvery(REMOVE_SONG_STORE, removeSongStoreFromDb)
}

function *removeSongStoreFromDb(action) {
  yield removeReduxSwarmLog(action.songStoreId)
  yield put(removeSongStoreSucceeded(action.songStoreId))
}
