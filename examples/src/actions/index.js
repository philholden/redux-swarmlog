export const ADD_SONG_STORE = 'ADD_SONG_STORE'
export const REMOVE_SONG_STORE = 'REMOVE_SONG_STORE'
export const PUT_SONG_IN_SONG_STORE = 'PUT_SONG_IN_SONG_STORE'
export const REMOVE_SONG_FROM_SONG_STORE = 'REMOVE_SONG_FROM_SONG_STORE'
export const ADD_SONG_STORE_SUCCEEDED = 'ADD_SONG_STORE_SUCCEEDED'

export const songStoreActions = [
  ADD_SONG_STORE,
  REMOVE_SONG_STORE,
  PUT_SONG_IN_SONG_STORE,
  REMOVE_SONG_FROM_SONG_STORE,
  ADD_SONG_STORE_SUCCEEDED
]

// {
//   "name": "Main",
//   "keys": {
//     "curve": "ed25519",
//     "public": "h95JVN6NbaITui+nnydEel3nGOKNcTG9cNzIe6+Wwjo=.ed25519",
//     "private": "VTJHCRTYJ4rrcnQR6V/RmdO/QUrF85tNxZXMQc2WaQSH3klU3o1tohO6L6efJ0R6XecY4o1xMb1w3Mh7r5bCOg==.ed25519",
//     "id": "@h95JVN6NbaITui+nnydEel3nGOKNcTG9cNzIe6+Wwjo=.ed25519"
//   },
//   "hashKey": "Main-h95JVN6NbaITui+nnydEel3nGOKNcTG9cNzIe6+Wwjo=.ed25519"
// }


export function addSongStore(meta) {
  return {
    type: ADD_SONG_STORE,
    meta
//    reduxSwarmLogId: songStoreId
  }
}

export function addSongStoreSucceeded(meta) {
  return {
    type: ADD_SONG_STORE_SUCCEEDED,
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
