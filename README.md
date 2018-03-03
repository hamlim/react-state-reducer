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

## API:

There are two core parts of react-state-reducer's API that should be kept in mind.

### Reducers:

The first is the `reducer`. A `reducer` is a higher order function (meaning it returns a function), that first accepts an `action` and returns a function that accepts the current state (and optionally any props provided to the `<Provider>`). This returned function should then handle returning the updated state.

That was a lot of different words describing what this is, lets look at some code to walk through this.

1. Lets start with the higher order function:

```js
const myReducer = someAction => {
  return (state) => {
    ...
  }
}
```

This function accepts a single argument (`someAction`) and returns a function. Which in turn accepts a single argument called `state`. This is often written as the following:

```js
const myReducer = action => state => { ... };
```

2. Handling updates within the returned function:

```js
const myReducer = action => state => {
  if (action === 'SOME_UPDATE') {
    return {
      ...state,
      someKey: '🆒',
    }
  }
}
```

Some notes with this implementation above:

* It doesn't follow the generic [Redux](https://redux.js.org/basics/reducers) reducer concept of using a `switch` you can handle writing this function however you would like (using `switch`, or using an if/else)

* Right now we are implicitly returning `undefined` if `action` does not equal `'SOME_UPDATE'`, while this is valid, you should make sure to at least handle returning the initial state if the action is the following shape:

```js
{type: '@@INIT', payload: null}
```

What this looks like in practice:

```js
const todoReducer = action => (state = { todos: [] }) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        todos: [
          ...state.todos,
          {
            id: state.todos.length,
            completed: false,
            text: action.payload,
          },
        ],
      }
    }
    case 'CHECK_TODO': {
      return {
        todos: todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            }
          } else {
            return todo
          }
        }),
      }
    }
    default:
      return state
  }
}
```

### `createStore`:

`createStore` is the main export of react-state-reducer, it is a function that accepts a `reducer` as an argument. It calls the reducer with the initialization action:

```js
yourReducer({ type: '@@INIT', payload: null })(null)
```

and then uses the result of calling the reducer as the initial state for the store. `createStore` then returns an object with the following:

```js
{
  Provider: Node,
  Consumer: Node
}
```
