export const ADD_SONG_STORE = 'ADD_SONG_STORE'
export const REMOVE_SONG_STORE = 'REMOVE_SONG_STORE'
export const PUT_SONG_IN_SONG_STORE = 'PUT_SONG_IN_SONG_STORE'
export const REMOVE_SONG_FROM_SONG_STORE = 'REMOVE_SONG_FROM_SONG_STORE'
export const ADD_SONG_STORE_SUCCEEDED = 'ADD_SONG_STORE_SUCCEEDED'
export const REMOVE_SONG_STORE_SUCCEEDED = 'REMOVE_SONG_STORE_SUCCEEDED'

export const songStoreActions = [
  ADD_SONG_STORE,
  REMOVE_SONG_STORE,
  PUT_SONG_IN_SONG_STORE,
  REMOVE_SONG_FROM_SONG_STORE,
  ADD_SONG_STORE_SUCCEEDED
]

export function addSongStore(swarmLogMeta) {
  return {
    type: ADD_SONG_STORE,
    swarmLogMeta
  }
}

export function addSongStoreSucceeded(swarmLogMeta) {
  return {
    type: ADD_SONG_STORE_SUCCEEDED,
    swarmLogMeta
  }
}

export function removeSongStore(songStoreId) {
  return {
    type: REMOVE_SONG_STORE,
    songStoreId
  }
}

export function removeSongStoreSucceeded(songStoreId) {
  return {
    type: REMOVE_SONG_STORE_SUCCEEDED,
    songStoreId
  }
}

export function putSongInSongStore(songStoreId, song) {
  return {
    type: PUT_SONG_IN_SONG_STORE,
    songStoreId,
    song,
    reduxSwarmLogId: songStoreId
  }
}

export function removeSongFromSongStore(songStoreId, songId) {
  return {
    type: REMOVE_SONG_FROM_SONG_STORE,
    songStoreId,
    songId,
    reduxSwarmLogId: songStoreId
  }
}
