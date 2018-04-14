import React, { createContext } from 'react'

const createStore = reducer => {
  let initialState = reducer({
    type: '@@INIT',
    payload: null,
  })(undefined)
  let ctx = createContext(initialState)

  class Provider extends React.Component {
    state = { ...initialState }
    dispatch = action =>
      this.setState(reducer(action), () => {
        this.props.onUpdate(this.state)
      })
    render() {
      return (
        <ctx.Provider
          value={{
            ...this.state,
            dispatch: this.dispatch,
          }}
        >
          {this.props.children}
        </ctx.Provider>
      )
    }
  }
  Provider.defaultProps = {
    onUpdate() {},
  }
  const Consumer = ({ children, selector = s => s }) => (
    <ctx.Consumer>
      {({ dispatch, ...state }) => {
        if (Array.isArray(selector)) {
          return children(
            { dispatch, ...state },
            selector.map(s => s(state)),
          )
        } else {
          return children(
            { dispatch, ...state },
            selector(state),
          )
        }
      }}
    </ctx.Consumer>
  )
  return { Provider, Consumer }
}

export default createStore

/**
 * Helper to transform classic redux reducers to new format
 */
export const transform = reducer => action => state =>
  reducer(state, action)
