export const ADD_SONG_STORE = 'ADD_SONG_STORE'
export const REMOVE_SONG_STORE = 'REMOVE_SONG_STORE'
export const PUT_SONG_IN_SONG_STORE = 'PUT_SONG_IN_SONG_STORE'
export const REMOVE_SONG_FROM_SONG_STORE = 'REMOVE_SONG_FROM_SONG_STORE'

export const songStoreActions = [
  ADD_SONG_STORE,
  REMOVE_SONG_STORE,
  PUT_SONG_IN_SONG_STORE,
  REMOVE_SONG_FROM_SONG_STORE
]

export function addSongStore(songStoreId, meta) {
  return {
    type: ADD_SONG_STORE,
    songStoreId,
    meta
//    reduxSwarmLogId: songStoreId
  }
}

export function removeSongStore(songStoreId) {
  return {
    type: REMOVE_SONG_STORE,
    songStoreId,
//    reduxSwarmLogId: songStoreId
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
