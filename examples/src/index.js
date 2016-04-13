import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers/index'
import { generateKeys } from './api'
import * as actions from './actions/index'

import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'

import {
  configureReduxSwarmLog,
  reduxSwarmLogMiddleware,
  getSwarmLogsFromDb,
  addReduxSwarmLog
} from '../../src/redux-swarmlog'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      reduxSwarmLogMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

window.actions = actions
window.dispatch = store.dispatch

configureReduxSwarmLog(store, generateKeys)
getSwarmLogsFromDb(reduxSwarmLogs => {
  if (Object.keys(reduxSwarmLogs).length === 0) {
    const name = 'Main'
    generateKeys()
      .then(keys => addReduxSwarmLog({ name, keys }))
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
