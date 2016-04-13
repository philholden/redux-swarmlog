import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers/index'
import { generateKeys } from './api'
import * as actions from './actions/index'
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

const _actions = bindActionCreators(actions, store.dispatch)
window._actions = _actions
window.actions = actions
window.dispatch = store.dispatch

configureReduxSwarmLog({
  reduxStore: store,
  generateKeys,
  logSampleActions,
  logLevel: 1
})

_actions.addSongStore({ name: 'Main' })

/*
getSwarmLogsFromDb(reduxSwarmLogs => {
  const action = log =>
    store.dispatch(actions.addSongStore(log))

  if (reduxSwarmLogs.length === 0) {
//    const name = 'Main'
    action({ name: 'Main' })
//    generateKeys()
//    .then(keys => addReduxSwarmLog({ name, keys }))
//      .then(keys => addReduxSwarmLog({ name, keys }))
  } else {
    reduxSwarmLogs.forEach(actions)
    //reduxSwarmLogs.forEach(addReduxSwarmLog)
  }
})
*/
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

function logSampleActions(hashKey) {
  console.log(
`
%cthe following actions can be dispatched from the console:

%c// add song
%cdispatch(actions.putSongInSongStore('${hashKey}', {id: 'hello', text: 'world'}))

%c// remove song
%cdispatch(actions.removeSongFromSongStore('${hashKey}', 'hello'))

`,
'font-weight: bold',
'font-style: italic; color: #888',
'color: #559',
'font-style: italic; color: #888',
'color: #559'
)
}
