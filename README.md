# React-State-Reducer

A simple (non-feature complete) ~clone~ reimplementation of [Redux](https://redux.js.org) built using React 16.3's `createContext`.

### Example:

```jsx
import React, { Fragment } from 'react'
import createStore from 'react-state-reducer'

const INITIAL_STATE = {
  count: 0,
}

const counterReducer = action => (state = INITIAL_STATE) => {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 }
    case 'DEC':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const { Provider, Consumer } = createStore(counterReducer)

export default () => (
  <Provider>
    <Consumer>
      {({ count, dispatch }) => (
        <Fragment>
          <button onClick={() => dispatch({ type: 'DEC' })}>-</button>
          {count}
          <button onClick={() => dispatch({ type: 'INC' })}>+</button>
        </Fragment>
      )}
    </Consumer>
  </Provider>
)
```
