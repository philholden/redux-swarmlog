import swarmlog from 'swarmlog'
import leveljs from 'level-js'
import levelup from 'levelup'
//import generateKeys from './generate-keys'
import { generateKeys } from './api'
import {
  songStoreActions,
  sessionId
} from './actions/index'

const songStoresDb = levelup('song-stores', { db: leveljs })
let _songStores = {}
let _reduxStore

window.clearTables = function () {
  indexedDB.deleteDatabase('IDBWrapper-foo')
  indexedDB.deleteDatabase('IDBWrapper-song-stores')
  indexedDB.deleteDatabase('IDBWrapper-Main-song-store')
  Object.keys(_songStores).forEach(key => {
    indexedDB.deleteDatabase(`IDBWrapper-${key}`)
  })
}

export function getSongStoresFromDb(callback) {
  songStoresDb.createReadStream()
  .on('data', data => {
    const value = JSON.parse(data.value)
    console.log(`hydrating existing store "${value.name}":"${data.value}"`)
    console.log(`addSongStore(${data.value})`)
    _songStores[value.hashKey] = new SongStoreDb(value)
  })
  .on('error', err => { console.log('Oh my!', err) })
  .on('end', () => {
    callback(_songStores)
  })
}

export function addSongStore({ name, keys }) {
  generateKeys()
    .then((resp) => _addSongStore({
      name,
      keys: keys || resp
    }))
}

function _addSongStore({ name, keys }) {
  const hashKey = `${name}-${keys.public}`
  if (_songStores[hashKey]) {
    console.log(`store named ${name} already exists`)
  }
  songStoresDb.get(hashKey, (err, value) => {
    if (err && err.notFound) {
      const keysJson = JSON.stringify({ name, keys, hashKey }, null, 2)
      songStoresDb.put(keys.public, keysJson, (err) => {
        if (err) {
          console.log('put error', name, keys, err)
        } else {
          _songStores[hashKey] = new SongStoreDb({
            name,
            keys,
            hashKey
          })
          console.log(`Key "${hashKey}" put in songStores with value:\n${keysJson}`)
          console.log(`addSongStore(${keysJson})`)
          console.log(`dispatch(actions.putSongInSongStore('${hashKey}', {id: 'hello', text: 'world'}))`)
        }
      })
    }
  })
}

window.addSongStore = addSongStore

export function configureSongStoreDb(store) {
  _reduxStore = store
}

export function songStoreDbMiddleware() {
  return next => action => {
    if (songStoreActions.indexOf(action.type) !== -1
        && !action.fromSwarm) {
      const songStore = _songStores[action.songStoreId]
      if(songStore) {
        songStore.log.append(action)
      }
    }
    next(action)
  }
}

export default class SongStoreDb {
  constructor({ name, keys, hashKey }) {
    console.log(`create SongStoreDb object ${name}`)
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
      if (action.sessionId !== sessionId) {
        _reduxStore.dispatch({
          ...action,
          fromSwarm: true
        })
      }
      console.log('RECEIVED', data.key, data.value)
    })
  }
}
