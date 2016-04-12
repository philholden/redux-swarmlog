import React, { Component } from 'react'
import { connect } from 'react-redux'

class _App extends Component {
  render() {
    return (
      <pre>
        {JSON.stringify(this.props.state, null, 2)}
      </pre>
    )
  }
}

export const App = connect(state => ({ state }))(_App)
