import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SongStoreSyncContainer from './song-store-sync-container'
import {
  addSongStore,
  removeSongStore
} from '../actions/index'


const SongItem = ({ name, onRemove }) => {
  return (
    <div>
      <span style={styles.title}>{ name }</span>
      {' '}
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

const AddSongForm = ({
  songStoreId,
  putSongInSongStore
}) => {
  let input
  const onAddSong = () => putSongInSongStore({ id: input.value })

  return (
    <div>
      <input type="text" ref={el => input = el} />
      {' '}
      <button onClick={onAddSong}>Add Song Store</button>
    </div>
  )
}

const SongList = ({
  songStore,
  putSongInSongStore,
  removeSongFromSongStore
}) => {
  let input
  const onAddSongStore = () => addSongStore({ name: input.value })
  return (
    <div>
      {
        songStores.map(({ id }) => (
          <SongStoreItemContainer id={id} key={id} />
        ))
      }
      <hr />

      <AddSongForm { ...{
        putSongInSongStore,
        songStoreId
      } } />
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
