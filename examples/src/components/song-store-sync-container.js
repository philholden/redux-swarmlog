import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addSongStore
} from '../actions/index'


const SongStoreSync = ({
  addSongStore
}) => {
  let publicKey, privateKey, name
  const onSyncSongStore = e => {
    e.preventDefault()
    const pub = publicKey.value
    const priv = privateKey.value

    let swarmLogMeta = { name : name.value }
    if (pub !== '' && pub) {
      swarmLogMeta.keys = {
        public: pub
      }
      if (priv !== '' && priv) {
        swarmLogMeta.keys.private = priv
      }
    }
    addSongStore(swarmLogMeta)
  }
  return (
    <form onSubmit={onSyncSongStore} style={styles.outer}>
      <div style={styles.hr}>
        <span style={styles.songStoreTitle}>Add & Sync Stores</span>
      </div>
      <div style={styles.row}>
        <div style={styles.inputs}>
          <input key="1" type="text" ref={el => name = el}/> Name <br/>
          <input key="2" type="text" ref={el => publicKey = el}/> Public <br/>
          <input key="3" type="text" ref={el => privateKey = el}/> Private <br/>
          <button>Add Store</button>
        </div>
        <ul style={styles.ul}>
          <li>To add a new local store just fill in name</li>
          <li>To sync a remote store add a name (can be anything) then add private and public keys to give read write access or just the public key for read only access</li>
        </ul>
      </div>
    </form>
  )
}

// const mapStateToProps = ({ songStores }) => ({
//   songStores: Object.keys(songStores)
//     .map(key => ({
//       ...songStores[key].swarmLogMeta
//     }))
// })

const mapDispatchToProps = dispatch => bindActionCreators({
  addSongStore
}, dispatch)

const SongStoreSyncContainer = connect(
  null,
  mapDispatchToProps
) (SongStoreSync)

export default SongStoreSyncContainer

const styles = {
  songStoreTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  hr: {
    borderBottom: '2px solid #eee',
    margin: '0 0 7px'
  },
  outer: {
    border: '1px solid #ccc',
    borderRadius: 3,
    padding: 20,
    fontFamily: 'sans-serif',
    lineHeight: 1.8,
    marginBottom: '1em'
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  inputs: {
    flexBasis: 260
  },
  ul: {
    fontSize: 12,
    marginTop: 0,
    maxWidth: 300
  }
}
