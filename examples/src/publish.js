import swarmlog from 'swarmlog'
import memdb from 'memdb'
import leveljs from 'level-js'
import levelup from 'levelup'
import sodium from 'chloride/browser'

//window.Key = Key

window.sodium = sodium

window.db = memdb()
//window.db = levelup('foo', { db: leveljs })
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
  const data = { message: 'HELLO!x' + times }
  log.append(data)
  times++
  const logEl = document.createElement('div')
  logEl.innerHTML = `<b>SENT:</b> ${JSON.stringify(data)}`
  document.body.insertBefore(logEl, document.body.firstChild)
}, 3000)

log.createReadStream({ live: true })
  .on('data', function (data) {
    const logEl = document.createElement('div')
    logEl.innerHTML = `<b>RECEIVED:</b> ${JSON.stringify(data.value)}`
    document.body.insertBefore(logEl, document.body.firstChild)
  })
