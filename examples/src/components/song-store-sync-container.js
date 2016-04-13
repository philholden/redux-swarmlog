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
  const onSyncSongStore = () => addSongStore({
    name: name.value,
    keys: {
      public: publicKey.value,
      private: privateKey.value
    },
    id: `${name.value.replace(/\s/g,'_')}-${privateKey.value}`
  })
  return (
    <div>
      <input key="1" type="text" ref={el => name = el}/> name <br/>
      <input key="2" type="text" ref={el => publicKey = el}/> public <br/>
      <input key="3" type="text" ref={el => privateKey = el}/> private <br/>
      <button onClick={onSyncSongStore}>Sync Song Store</button>
    </div>
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
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  }
}
