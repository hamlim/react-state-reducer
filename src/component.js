import React, { Component } from 'react'
import createStore from './createStore'

export default class CreateStore extends Component {
  state = { store: createStore(this.props.reducer) }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      store: createStore(nextProps.reducer),
    }
  }
  render() {
    return this.props.children({
      Provider: this.state.store.Provider,
      Consumer: this.state.store.Consumer,
    })
  }
}
