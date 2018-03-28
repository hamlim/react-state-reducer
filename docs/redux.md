# Redux and React-Redux

If you are looking to migrate from Redux to React-State-Reducer there are a few things to keep in mind.

1.  The `reducer` function has a different signature.

In React-State-Reducer the reducer function is a curried function that first accepts the action, then accepts the previous state and you return the new state. We export a `transform` helper function that wraps a classical reducer function and returns a function that supports this new format:

```js
import { transform } from 'react-state-reducer'

const myReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
      }
    case 'decrement':
      return {
        count: state.count - 1,
      }
    default:
      return state
  }
}

export default transform(myReducer)
```

2.  The `connect` pattern has changed slightly.

We don't directly expose a `connect` higher-order-component from React-State-Reducer, however here is an entirely naive implementation that might work out of the box for many:

```jsx
const connect = (
  mapStateToProps,
  mapDispatchToProps,
) => Component => ownProps => (
  <Consumer>
    {({ dispatch, ...state }) => {
      const props = mapStateToProps(state, ownProps)
      const mappedDispatch = Object.keys(
        mapDispatchToProps,
      ).reduce(
        (acc, creator) => ({
          ...acc,
          [creator]: (...args) =>
            dispatch(mapDispatchToProps[creator](...args)),
        }),
        {},
      )
      return (
        <Component
          {...props}
          {...mappedDispatch}
          {...ownProps}
        />
      )
    }}
  </Consumer>
)
```

An example of this in use:

```jsx
const selectCount = state => state.count

const mapStateToProps = state => ({
  count: selectCount(state),
})

const mapDispatchToProps = {
  increment() {
    return {
      type: 'increment',
    }
  },
  decrement() {
    return {
      type: 'decrement',
    }
  },
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

const Counter = ({ count, increment, decrement }) => (
  <React.Fragment>
    <button onClick={increment}>+</button>
    {count}
    <button onClick={decrement}>-</button>
  </React.Fragment>
)

const EnhancedCounter = enhance(Counter)
```
