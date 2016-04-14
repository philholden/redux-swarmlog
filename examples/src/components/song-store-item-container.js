import React from 'react'
import { connect } from 'react-redux'

import {
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

const mapStateToProps = ({ songStores }, { id }) => {
  const { swarmLogMeta } = songStores[id]
  console.log('here',songStores, id)
  return {
    id,
    name: swarmLogMeta.name
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  onRemove: () => dispatch(removeSongStore(id))
})

const SongStoreItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
) (SongStoreItem)

export default SongStoreItemContainer

const styles = {
  songStoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  }
}
