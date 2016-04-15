import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SongStoreSyncContainer from './song-store-sync-container'
import SongStoreItemContainer from './song-store-item-container'
import {
  addSongStore
} from '../actions/index'

const SongStoreList = ({
  songStores
}) => {
  let input
  return (
    <div>
      { songStores.map(({ id }) => (
          <SongStoreItemContainer id={id} key={id} />
        ))
      }
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

// const mapDispatchToProps = dispatch => bindActionCreators({
//   addSongStore
// }, dispatch)

const SongStoreListContainer = connect(
  mapStateToProps,
  null
) (SongStoreList)

export default SongStoreListContainer

const styles = {
  songStoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
  inputWrapper: {
    margin: '6px 0'
  }
}
