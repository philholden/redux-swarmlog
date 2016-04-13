import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers/index'
import { generateKeys } from './api'
import * as _actions from './actions/index'
import createSagaMiddleware from 'redux-saga'
import { addSongStore } from './sagas'
import { bindActionCreators } from 'redux'

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


const sagaMiddleware = createSagaMiddleware(addSongStore)

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      reduxSwarmLogMiddleware,
      sagaMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

const actions = bindActionCreators(_actions, store.dispatch)

window.actions = actions
window.dispatch = store.dispatch

configureReduxSwarmLog({
  reduxStore: store,
  generateKeys,
  logSampleActions,
  logLevel: 1
})

//_actions.addSongStore({ name: 'My Songs' })


getSwarmLogsFromDb(reduxSwarmLogs => {
  if (reduxSwarmLogs.length === 0) {
    actions.addSongStore({ name: 'My Songs' })
  } else {
    console.log(reduxSwarmLogs)
    reduxSwarmLogs.forEach(actions.addSongStore)
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

function logSampleActions(id) {
  console.log(
`
%cthe following actions can be dispatched from the console:

%c// add song
%cactions.putSongInSongStore('${id}', {id: 'hello', text: 'world'})

%c// remove song
%cactions.removeSongFromSongStore('${id}', 'hello')

`,
'font-weight: bold',
'font-style: italic; color: #888',
'color: #559',
'font-style: italic; color: #888',
'color: #559'
)
}
