import swarmlog from 'swarmlog'
import memdb from 'memdb'

const log = swarmlog({
  publicKey: require('../keys.json').public,
  sodium: require('chloride/browser'),
  db: memdb(),
  valueEncoding: 'json',
  hubs: [ 'https://signalhub.mafintosh.com' ]
})

log.createReadStream({ live: true })
  .on('data', function (data) {
    //console.log('RECEIVED', data.key, data.value)
    const logEl = document.createElement('div')
    logEl.innerHTML = `<b>RECEIVED:</b> ${JSON.stringify(data.value)}`
    document.body.insertBefore(logEl, document.body.firstChild)
  })
