import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SongStoreSyncContainer from './song-store-sync-container'
import {
  addSongStore,
  removeSongStore
} from '../actions/index'


const SongStoreItem = ({ name, onRemove }) => {
  return (
    <div>
      <span style={styles.songStoreTitle}>{ name }</span>
      {' '}
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

const SongStoreList = ({
  songStores,
  removeSongStore,
  addSongStore
}) => {
  let input
  const onAddSongStore = () => addSongStore({ name: input.value })
  return (
    <div>
      { songStores.map(({ id, name }) => (
          <SongStoreItem { ...{
            id,
            name,
            onRemove: () => removeSongStore(id),
            key: id
          } } />
        ))
      }
      <hr />
      <input type="text" ref={el => input = el}/>
      {' '}
      <button onClick={onAddSongStore}>Add Song Store</button>
      <hr />
      <SongStoreSyncContainer />
    </div>
  )
}

const mapStateToProps = ({ songStores }) => ({
  songStores: Object.keys(songStores)
    .map(key => ({
      ...songStores[key].swarmLogMeta
    }))
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addSongStore,
  removeSongStore
}, dispatch)

const SongStoreListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
) (SongStoreList)

export default SongStoreListContainer

const styles = {
  songStoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  }
}
