import {
  ADD_SONG_STORE,
  REMOVE_SONG_STORE,
  PUT_SONG_IN_SONG_STORE,
  REMOVE_SONG_FROM_SONG_STORE
} from '../actions/index'

export function root(state = {}, action) {
  switch (action.type) {
    case ADD_SONG_STORE:
    case REMOVE_SONG_STORE:
    case PUT_SONG_IN_SONG_STORE:
    case REMOVE_SONG_FROM_SONG_STORE:
      return {
        ...state,
        songStores: songStores(state.songStores, action)
      }
    default:
      return state
  }
}

export default function songStores(state = {}, action) {
  switch (action.type) {
    case ADD_SONG_STORE:
      return {
        ...state,
        [action.songStoreId]: {}
      }
    case REMOVE_SONG_STORE: {
      const songStores = ({ ...state })[action.id]
      delete songStores[action.songStoreId]
      return songStores
    }
    case PUT_SONG_IN_SONG_STORE:
    case REMOVE_SONG_FROM_SONG_STORE:
      return {
        ...state,
        [action.songStoreId]: songStore(state[action.songStoreId], action)
      }
    default:
      return state
  }
}

function songStore(state = {}, action) {
  switch (action.type) {
    case PUT_SONG_IN_SONG_STORE:
      return {
        ...state,
        [action.song.id]: action.song
      }
    case REMOVE_SONG_FROM_SONG_STORE: {
      console.log(action, state)
      const songs = { ...state }
      delete songs[action.songId]
      console.log(`delete ${action.id}` + songs)
      return songs
    }
    default:
      return state
  }
}

export function getSong(state, songStoreId, songId) {
  return state.songStores[songStoreId][songId]
}
