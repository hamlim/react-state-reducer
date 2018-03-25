import React, { createContext } from 'react'

const createStore = reducer => {
  let initialState = reducer({
    type: '@@INIT',
    payload: null,
  })(undefined)
  const ctx = createContext(initialState)

  class Provider extends React.PureComponent {
    state = { ...initialState }
    dispatch = action =>
      this.setState(reducer(action), () => {
        this.props.onUpdate(this.state)
      })
    render() {
      return (
        <ctx.Provider
          value={{ ...this.state, dispatch: this.dispatch }}
        >
          {this.props.children}
        </ctx.Provider>
      )
    }
  }
  Provider.defaultProps = {
    onUpdate() {},
  }
  return { Provider, Consumer: ctx.Consumer }
}

export default createStore
