import React, { Component } from 'react'
import { NICE, SUPER_NICE } from './colors'
import man from '../img/man.png'
import { connect } from 'react-redux';

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.interval = setInterval(() => this.tick(), 1000)

  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <h1 style={{ color: this.props.color, background: 'transparent' }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    )
  }
}

export const HelloWorld = () => <div>Hello World.</div>

class _App extends Component {
  render() {
    return (
      <div>
        {'a' + JSON.stringify(this.props.state)}
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
        <HelloWorld />
        <img src={man} />
      </div>
    )
  }
}

export const App = connect(state => ({ state }))(_App)
