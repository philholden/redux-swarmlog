import swarmlog from 'swarmlog'
import memdb from 'memdb'

const log = swarmlog({
  publicKey: require('../keys-old.json').public,
  sodium: require('chloride/browser'),
  db: memdb(),
  valueEncoding: 'json',
  hubs: [ 'https://signalhub.mafintosh.com' ]
})

log.createReadStream({ live: true })
  .on('data', function (data) {
    console.log('RECEIVED', data.key, data.value)
  })
