import React, { Fragment } from 'react'

import createStore from '../src/createStore.js'

const myReducer = action => (state = { content: null }) => {
  switch (action.type) {
    case 'LOADED':
      return { ...state, content: action.payload }
    default:
      return state
  }
}

const { Provider, Consumer } = createStore(myReducer)

const actionCreator = dispatch => async _ => {
  const content = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const text = await content.text()
  dispatch({ type: 'LOADED', payload: text })
}

export default () => (
  <Provider>
    <Consumer>
      {({ content, dispatch }) => (
        <Fragment>
          {content}
          {!content ? (
            <button onClick={actionCreator(dispatch)}>Load content</button>
          ) : null}
        </Fragment>
      )}
    </Consumer>
  </Provider>
)
