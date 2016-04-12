import swarmlog from 'swarmlog'
import memdb from 'memdb'
import leveljs from 'level-js'
import levelup from 'levelup'
import sodium from 'chloride/browser'

//window.Key = Key

window.sodium = sodium

//window.db = memdb()
window.db = levelup('foo', { db: leveljs })
//indexedDB.deleteDatabase('IDBWrapper-foo')

const log = swarmlog({
  keys: require('../keys.json'),
  sodium,
  db: window.db,
  valueEncoding: 'json',
  hubs: [ 'https://signalhub.mafintosh.com' ]
})

let times = 0
setInterval(function () {
  log.append({ logo: 'HELLO!x' + times })
  times++
}, 10000)

log.createReadStream({ live: true })
  .on('data', function (data) {
    console.log('RECEIVED', data.key, data.value)
  })
