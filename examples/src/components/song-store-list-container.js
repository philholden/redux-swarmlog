import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addSongStore,
  removeSongStore
} from '../actions/index'


const SongStoreItem = ({ id, onRemove }) => {
  return (
    <div>
      { id }
      {' '}
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

const SongStoreList = ({ songStores, removeSongStore }) => {
  return (
    <div>
      { songStores.map(songStore => (
          <SongStoreItem { ...{
            id: songStore.id,
            onRemove: () => removeSongStore(songStore.id),
            key: songStore.id
          } } />
        ))
      }
    </div>
  )
}

const mapStateToProps = ({ songStores }) => ({
  songStores: Object.keys(songStores)
    .map(key => ({
      ...songStores[key],
      id: key
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
