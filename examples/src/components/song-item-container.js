import React from 'react'
import { connect } from 'react-redux'

import {
  removeSongFromSongStore
} from '../actions/index'

const SongItem = ({ song, onRemove }) => {
  return (
    <div>
      <span style={styles.songStoreTitle}>{ song.id }</span>
      {' '}
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

const mapStateToProps = (
  { songStores },
  { songStoreId, songId }
) => {
  return {
    songStoreId,
    song: songStores[songStoreId].songs[songId]
  }
}

const mapDispatchToProps = (dispatch, { songStoreId, songId }) => ({
  onRemove: () => dispatch(removeSongFromSongStore(
    songStoreId,
    songId
  ))
})

const SongItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
) (SongItem)

export default SongItemContainer

const styles = {
  songStoreTitle: {
    fontSize: 16,
    fontFamily: 'sans-serif'
  }
}
