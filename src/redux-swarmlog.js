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

window.levelup = levelup

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

export const keyToUriId = (key) =>
  key
    .replace(/\//g,'_')
    .replace(/\+/g,'-')
    .replace(/=+\.ed25519/,'')

export const uriIdToKey = (uriId) =>
  uriId
    .replace(/\_/g,'/')
    .replace(/\-/g,'+') +
    (uriId.length > 70 ? '=' : '') +
    '=.ed25519'

export function getSwarmLogsFromDb() {
  return new Promise((resolve, reject) => {
    const reduxSwarmLogs = []
    reduxSwarmLogsDb.createReadStream()
    .on('data', data => {
      const value = JSON.parse(data.value)
      logJson(`hydrating from indexedDB`, value.id)
      reduxSwarmLogs.push(value)
    })
    .on('error', err => reject(err))
    .on('end', () => resolve(reduxSwarmLogs))
  })
}

export function removeReduxSwarmLog(id) {
  return new Promise((resolve, reject) => {
    const reduxSwarmLog = _reduxSwarmLogs[id]
    //console.log(_reduxSwarmLogs, id, reduxSwarmLog.db.close)
    reduxSwarmLog.db.close()
    const req = indexedDB.deleteDatabase(`IDBWrapper-${id}`)
    req.onsuccess = () => {
      console.log(`database deleted`)
      reduxSwarmLogsDb.del(reduxSwarmLog.keys.public, err => {
        if (err) {
          console.log(`Couldn't delete database entry`)
          reject()
        } else {
          console.log(`database entry deleted`)
          resolve(`Database removed`)
        }
      })
    }

    req.onerror = () => {
      console.log(`Couldn't delete database`)
      reject()
    }

    req.onblocked = () => {
      console.log(`Couldn't delete database blocked`)
      reject()
    }
  })
}

export function addReduxSwarmLog(props) {
  return new Promise((resolve, reject) => {
    props.id = keyToUriId(props.keys.public)
    const { name, keys, id } = props
    const propsJson = JSON.stringify(props, null, 2)

    if (_reduxSwarmLogs[id]) {
      console.log(`store named ${name} already exists`)
      resolve(_reduxSwarmLogs[id])
      return
    }

    reduxSwarmLogsDb.get(id, (err, value) => {
      if (err && err.notFound) {
        reduxSwarmLogsDb.put(keys.public, propsJson, (err) => {
          if (err) return reject(err)
        })
      }
      _reduxSwarmLogs[id] = new ReduxSwarmLog({
        name,
        keys,
        id
      })
      _logSampleActions(props)
      resolve(_reduxSwarmLogs[id])
    })
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
    if (!action.fromSwarm && reduxSwarmLog && reduxSwarmLog.keys.private) {
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
  constructor({ name, keys, id }) {
    this.db = levelup(id, { db: leveljs })
    this.keys = keys
    this.log = this.getSwarmLog()
    this.name = name
    this.startReadStream()
    this.id = id
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
