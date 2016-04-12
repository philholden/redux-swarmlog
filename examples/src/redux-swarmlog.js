import swarmlog from 'swarmlog'
import leveljs from 'level-js'
import levelup from 'levelup'
//import generateKeys from './generate-keys'
import { generateKeys } from './api'
import { randomBytes } from 'crypto'

const sessionId = randomBytes(32).toString('base64')
const reduxSwarmLogsDb = levelup('swarmlogs', { db: leveljs })
let _reduxSwarmLogs = {}
let _reduxStore

window.clearTables = function () {
  indexedDB.deleteDatabase('IDBWrapper-foo')
  indexedDB.deleteDatabase('IDBWrapper-swarmlogs')
  indexedDB.deleteDatabase('IDBWrapper-Main-song-store')
  Object.keys(_reduxSwarmLogs).forEach(key => {
    indexedDB.deleteDatabase(`IDBWrapper-${key}`)
  })
}

export function getSwarmLogsFromDb(callback) {
  reduxSwarmLogsDb.createReadStream()
  .on('data', data => {
    const value = JSON.parse(data.value)
    console.log(`hydrating existing store "${value.name}":"${data.value}"`)
    console.log(`addReduxSwarmLog(${data.value})`)
    _reduxSwarmLogs[value.hashKey] = new ReduxSwarmLog(value)
  })
  .on('error', err => { console.log('Oh my!', err) })
  .on('end', () => {
    callback(_reduxSwarmLogs)
  })
}

export function addReduxSwarmLog({ name, keys }) {
  generateKeys()
    .then((resp) => _addReduxSwarmLog({
      name,
      keys: keys || resp
    }))
}

function _addReduxSwarmLog({ name, keys }) {
  const hashKey = `${name}-${keys.public}`
  if (_reduxSwarmLogs[hashKey]) {
    console.log(`store named ${name} already exists`)
  }
  reduxSwarmLogsDb.get(hashKey, (err, value) => {
    if (err && err.notFound) {
      const keysJson = JSON.stringify({ name, keys, hashKey }, null, 2)
      reduxSwarmLogsDb.put(keys.public, keysJson, (err) => {
        if (err) {
          console.log('put error', name, keys, err)
        } else {
          _reduxSwarmLogs[hashKey] = new ReduxSwarmLog({
            name,
            keys,
            hashKey
          })
          console.log(`Key "${hashKey}" put in reduxSwarmLogs with value:\n${keysJson}`)
          console.log(`addReduxSwarmLog(${keysJson})`)
          console.log(`dispatch(actions.putSongInSongStore('${hashKey}', {id: 'hello', text: 'world'}))`)
        }
      })
    }
  })
}

window.addReduxSwarmLog = addReduxSwarmLog

export function configureReduxSwarmLog(reduxStore) {
  _reduxStore = reduxStore
}

export function reduxSwarmLogMiddleware() {
  return next => action => {
    const reduxSwarmLog = _reduxSwarmLogs[action.reduxSwarmLogId]
    if (!action.fromSwarm && reduxSwarmLog) {
      if(reduxSwarmLog) {
        reduxSwarmLog.log.append(action)
      }
      next({
        ...action,
        swarmLogSessionId: sessionId
      })
    } else {
      next(action)
    }
  }
}

export default class ReduxSwarmLog {
  constructor({ name, keys, hashKey }) {
    console.log(`create ReduxSwarmLog object ${name}`)
    this.db = levelup(hashKey, { db: leveljs })
    this.keys = keys
    this.log = this.getSwarmLog()
    this.name = name
    this.startReadStream()
    this.hashKey = hashKey
    console.log(this.keys, this.db)
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
    console.log(`start listening to ${this.name}`)
    this.log.createReadStream({ live: true })
    .on('data', function (data) {
      console.log('data')
      const action = data.value
      console.log(action)
      if (action.swarmLogSessionId !== sessionId) {
        _reduxStore.dispatch({
          ...action,
          fromSwarm: true
        })
      }
      console.log('RECEIVED', data.key, data.value)
    })
  }
}
