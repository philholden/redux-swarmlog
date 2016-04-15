import React from 'react'
import { connect } from 'react-redux'
import SongListContainer from './song-list-container'

import {
  removeSongStore
} from '../actions/index'

const SongStoreItem = ({ name, keys, id, onRemove }) => {
  return (
    <div style={styles.outer}>
      <div style={styles.hr}>
        <span style={styles.songStoreTitle}>{ name }</span>
        {' '}
        <button onClick={onRemove}>Remove</button>
      </div>
      <SongListContainer songStoreId={id} />
      <div style={styles.keys}>
        <b>public key:</b> <input value={keys.public} readOnly={true}/><br />
        <b>private key:</b> <input value={keys.private} readOnly={true}/><br />
      </div>
    </div>
  )
}

const mapStateToProps = ({ songStores }, { id }) => {
  const { swarmLogMeta } = songStores[id]
  return {
    ...swarmLogMeta
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
  },
  outer: {
    border: '1px solid #ccc',
    borderRadius: 3,
    padding: 20,
    fontFamily: 'sans-serif',
    lineHeight: 1.8,
    marginBottom: '1em'
  },
  hr: {
    borderBottom: '2px solid #eee',
    margin: '0 0 7px'
  },
  keys: {
    fontSize: 11,
  }
}
