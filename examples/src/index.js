import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers/index'
import { generateKeys } from './api'
import * as _actions from './actions/index'
import { sagaMiddleware } from './sagas'
import { bindActionCreators } from 'redux'

import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'

import {
  configureReduxSwarmLog,
  reduxSwarmLogMiddleware,
  getSwarmLogsFromDb
} from '../../src/redux-swarmlog'

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

getSwarmLogsFromDb()
  .then(reduxSwarmLogs => {
    if (reduxSwarmLogs.length === 0) {
      actions.addSongStore({ name: 'My Songs' })
    } else {
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

%c// add song store
%cactions.addSongStore({ name: 'New Song Store' })

%c// remove song store
%cactions.removeSongStore('${id}')

`,
'font-weight: bold',
'font-style: italic; color: #888',
'color: #559',
'font-style: italic; color: #888',
'color: #559',
'font-style: italic; color: #888',
'color: #559',
'font-style: italic; color: #888',
'color: #559'
)
}
