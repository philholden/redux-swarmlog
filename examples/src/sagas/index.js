import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { generateKeys } from '../api'
import {
  getSwarmLogsFromDb,
  addReduxSwarmLog
} from '../../../src/redux-swarmlog'
import {
  addSongStoreSucceeded
} from '../actions/index'

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function *helloSaga() {
  console.log('Hello Sagas!')
}

const log = (...args) => console.log('saga', args)

export function *delaySaga() {
  yield* takeEvery(
    'PUT_SONG_IN_SONG_STORE',
    log
  )

}

export function *addSongStore() {
  console.log('here')
  yield* takeEvery(
    'ADD_SONG_STORE',
    getKeys
  )
}

export function *getKeys(action) {
  let meta = action.meta || {}
  if (!action.meta.keys) {
    meta.keys = yield call(generateKeys)
    meta.id = `${meta.name.replace(/\s/g,'_')}-${meta.keys.public}`
  }
  addReduxSwarmLog(meta)
  yield put(addSongStoreSucceeded(meta))
}
