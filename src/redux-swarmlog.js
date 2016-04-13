import swarmlog from 'swarmlog'
import leveljs from 'level-js'
import levelup from 'levelup'
import { randomBytes } from 'crypto'

const sessionId = randomBytes(32).toString('base64')
const reduxSwarmLogsDb = levelup('swarmlogs', { db: leveljs })
let _reduxSwarmLogs = {}
let _reduxStore
let _logLevel
let _logSampleActions = (...args) => {
  if (_logLevel) console.log(args)
}

window.clearTables = function () {
  indexedDB.deleteDatabase('IDBWrapper-foo')
  indexedDB.deleteDatabase('IDBWrapper-swarmlogs')
  indexedDB.deleteDatabase('IDBWrapper-Main-song-store')
  Object.keys(_reduxSwarmLogs).forEach(key => {
    indexedDB.deleteDatabase(`IDBWrapper-${key}`)
  })
  window.indexedDB.webkitGetDatabaseNames.onsuccess = (names) => {
    console.log(names)
  }
}

export function getSwarmLogsFromDb(callback) {
  const reduxSwarmLogs = []
  reduxSwarmLogsDb.createReadStream()
  .on('data', data => {
    const value = JSON.parse(data.value)
    logJson(`hydrating from indexedDB`, value.hashKey)
    reduxSwarmLogs.push(value)
  })
  .on('error', err => { console.log('Oh my!', err) })
  .on('end', () => {
    callback(reduxSwarmLogs)
  })
}

export function addReduxSwarmLog({ name, keys, id }) {
  const hashKey = id
  const keysJson = JSON.stringify({ name, keys, id }, null, 2)

  if (_reduxSwarmLogs[hashKey]) {
    console.log(`store named ${name} already exists`)
    return
  }

  reduxSwarmLogsDb.get(hashKey, (err, value) => {
    if (err && err.notFound) {
      reduxSwarmLogsDb.put(keys.public, keysJson, (err) => {
        if (err) {
          console.log('put error', name, keys, err)
        }
      })
    }
    _reduxSwarmLogs[hashKey] = new ReduxSwarmLog({
      name,
      keys,
      hashKey
    })
    logReplaicateActions(JSON.parse(keysJson))
  })
}

window.addReduxSwarmLog = addReduxSwarmLog

export function configureReduxSwarmLog({
  reduxStore,
  logSampleActions = _logSampleActions,
  logLevel = 1
}) {
  _reduxStore = reduxStore
  _logSampleActions = logSampleActions
  _logLevel = logLevel
}

export function reduxSwarmLogMiddleware() {
  return next => action => {
    const reduxSwarmLog = _reduxSwarmLogs[action.reduxSwarmLogId]
    if (!action.fromSwarm && reduxSwarmLog) {
      action = {
        ...action,
        swarmLogSessionId: sessionId
      }
      if(reduxSwarmLog) {
        reduxSwarmLog.log.append(action)
        logJson('RTC SENT', action)
      }
    }
    next(action)
  }
}

export default class ReduxSwarmLog {
  constructor({ name, keys, hashKey }) {
    this.db = levelup(hashKey, { db: leveljs })
    this.keys = keys
    this.log = this.getSwarmLog()
    this.name = name
    this.startReadStream()
    this.hashKey = hashKey
    logJson(
      `CREATING ReduxSwarmLog ${name} and start listening`,
      this.keys,
      'green'
    )
  }

  getSwarmLog() {
    return swarmlog({
      keys: this.keys,
      sodium: require('chloride/browser'),
      db: this.db,
      valueEncoding: 'json',
      hubs: [ 'https://signalhub.mafintosh.com' ]
    })
  }

  startReadStream() {
    this.log.createReadStream({ live: true })
    .on('data', function (data) {
      const action = data.value
      if (action.swarmLogSessionId !== sessionId) {
        _reduxStore.dispatch({
          ...action,
          fromSwarm: true
        })
      }
      logJson('RTC RECEIVED', data.value)
    })
  }
}

function logJson(message, payload, color='black') {
  if (!_logLevel) return
  if ( typeof payload === 'string') {

  }
  console.log(
`
%c${message}:

%c${
  typeof payload === 'string' ?
  payload:
  JSON.stringify(payload, null, 2)
}

`,
    `font-weight: bold; color: ${color}`,
    'font-weight: normal'
  )
}

function logReplaicateActions(keysJson) {
  if (!_logLevel) return
  console.log(`
%cexecute this snippet on remote machine (or local incognito window) to sync store there:

%caddReduxSwarmLog(${JSON.stringify(keysJson, null, 2)})

`,
'font-weight: bold',
'font-weight: normal; color: #559',

)
  _logSampleActions(keysJson.id)
}
