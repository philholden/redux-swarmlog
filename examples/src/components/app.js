import React, { Component } from 'react'
import { connect } from 'react-redux'
import SongStoreListContainer from './song-store-list-container'


class App extends Component {
  render() {
    return (
      <div>
      <SongStoreListContainer />
      <pre>
        {
        //  JSON.stringify(this.props.state, null, 2)
        }
      </pre>
      </div>

    )
  }
}

export default connect(state => ({ state }))(App)
