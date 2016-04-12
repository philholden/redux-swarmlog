import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { createStore, applyMiddleware, compose } from 'redux'
//import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index'
import { randomBytes } from 'crypto'
//var randomBytes = require('crypto').randomBytes
//import rootSaga from './sagas'
//import sagaMonitor from '../../sagaMonitor'
import {
  configureSongStoreDb,
  songStoreDbMiddleware,
  getSongStoresFromDb,
  addSongStore
} from './song-store-db'

import * as actions from './actions/index'

window.actions = actions

console.log(randomBytes(32).toString('base64'))

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
//    sagaMonitor,
//    createSagaMiddleware(rootSaga)
      songStoreDbMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

window.dispatch = store.dispatch

configureSongStoreDb(store)
getSongStoresFromDb(songStores => {
  if (Object.keys(songStores).length === 0) {
    addSongStore({ name: 'Main' })
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
