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
  configureReduxSwarmLog,
  reduxSwarmLogMiddleware,
  getSwarmLogsFromDb,
  addReduxSwarmLog
} from './redux-swarmlog'

import * as actions from './actions/index'

window.actions = actions

console.log(randomBytes(32).toString('base64'))

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
//    sagaMonitor,
//    createSagaMiddleware(rootSaga)
      reduxSwarmLogMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

window.dispatch = store.dispatch

configureReduxSwarmLog(store)
getSwarmLogsFromDb(reduxSwarmLogs => {
  if (Object.keys(reduxSwarmLogs).length === 0) {
    addReduxSwarmLog({ name: 'Main' })
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
