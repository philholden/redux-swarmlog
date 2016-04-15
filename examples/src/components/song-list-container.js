import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SongItemContainer from './song-item-container'
import {
  putSongInSongStore
} from '../actions/index'


const AddSongForm = ({
  songStoreId,
  putSongInSongStore
}) => {
  let input

  const onAddSong = e => {
    e.preventDefault()
    putSongInSongStore(
      songStoreId,
      {
        id: input.value,
        name: input.value
      }
    )
  }

  return (
    <div>
      <form onSubmit={onAddSong}>
        <input type="text" ref={el => input = el} />
        {' '}
        <button onClick={onAddSong}>Add Song</button>
      </form>
    </div>
  )
}

const SongList = ({
  songIds,
  songStoreId,
  putSongInSongStore
}) => {

  return (
    <div>
      {
        songIds.map(songId => (
          <SongItemContainer
            songId={songId}
            songStoreId={songStoreId}
            key={songId}
          />
        ))
      }

      <AddSongForm { ...{
        songStoreId,
        putSongInSongStore
      } } />
    </div>
  )
}

const mapStateToProps = (
  { songStores },
  { songStoreId }
) => {
  const songs = songStores[songStoreId].songs
  return {
    songStoreId,
    songIds: Object.keys(songs)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  putSongInSongStore
}, dispatch)

const SongListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
) (SongList)

export default SongListContainer

const styles = {
  songStoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  }
}
