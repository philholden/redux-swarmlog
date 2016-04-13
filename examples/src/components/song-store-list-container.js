import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addSongStore,
  removeSongStore
} from '../actions/index'


const SongStoreItem = ({ name, onRemove }) => {
  return (
    <div>
      { name }
      {' '}
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

const SongStoreList = ({ songStores, removeSongStore }) => {
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
