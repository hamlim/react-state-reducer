import React, { Fragment } from 'react'
import createStore from '../src/createStore.js'

const myReducer = action => (state = { count: 0 }, props) => {
  switch (action.type) {
    case 'INC': {
      return { ...state, count: state.count + 1 }
    }
    case 'DEC': {
      return { ...state, count: state.count - 1 }
    }
    default:
      return state
  }
}

const { Provider, Consumer } = createStore(myReducer)

const App = () => (
  <Provider>
    <Consumer>
      {({ count, dispatch }) => (
        <Fragment>
          <button onClick={_ => dispatch({ type: 'DEC' })}>-</button>
          {count}
          <button onClick={_ => dispatch({ type: 'INC' })}>+</button>
        </Fragment>
      )}
    </Consumer>
  </Provider>
)
export default App
