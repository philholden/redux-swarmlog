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

configureReduxSwarmLog({
  reduxStore: store,
  generateKeys,
  logSampleActions,
  logLevel: 1
})

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

function logSampleActions(hashKey) {
  console.log(
`
%cexecute in console to add song:

%cdispatch(actions.putSongInSongStore('${hashKey}', {id: 'hello', text: 'world'}))

%cexecute in console to remove song:

%cdispatch(actions.removeSongFromSongStore('${hashKey}', 'hello'))

`,
'font-weight: bold',
'font-weight: normal; color: #559',
'font-weight: bold',
'font-weight: normal; color: #559'
)
}
