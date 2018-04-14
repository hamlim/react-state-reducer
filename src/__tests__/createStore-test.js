import React from 'react'
import { render } from 'react-testing-library'
import createStore, { transform } from '../index.js'

const mockReducer = () => (s = { counter: 0 }) => {
  return s
}

const oldReducer = (state, action) => {
  return { state, action }
}

describe('createStore', () => {
  it('returns an object with Provider and Consumer keys', () => {
    const result = createStore(mockReducer)
    expect(Object.keys(result)).toEqual([
      'Provider',
      'Consumer',
    ])
  })

  it('Consumer will be called with an object providing dispatch and state keys', () => {
    const { Provider, Consumer } = createStore(mockReducer)
    const mock = jest.fn()
    render(
      <Provider>
        <Consumer>
          {args => {
            mock(args)
            return null
          }}
        </Consumer>
      </Provider>,
    )
    expect(mock).toHaveBeenCalledWith(
      expect.objectContaining({
        dispatch: expect.any(Function),
        counter: expect.any(Number),
      }),
    )
  })

  it('Consumer supports a selector prop', () => {
    const selector = s => s.counter
    const { Provider, Consumer } = createStore(mockReducer)
    const mock = jest.fn()
    render(
      <Provider>
        <Consumer selector={selector}>
          {(...args) => {
            mock(...args)
            return null
          }}
        </Consumer>
      </Provider>,
    )
    expect(mock).toHaveBeenCalledWith(
      // the state + dispatch object
      expect.objectContaining({
        dispatch: expect.any(Function),
        counter: expect.any(Number),
      }),
      // the value of the counter
      0,
    )
  })

  it('Consumer supports an array of selectors', () => {
    const selectCount = s => s.counter
    const selectTodos = s => s.todos
    const reducer = () => (s = { counter: 0, todos: [] }) =>
      s
    const { Provider, Consumer } = createStore(reducer)
    const mock = jest.fn()
    render(
      <Provider>
        <Consumer selector={[selectCount, selectTodos]}>
          {(...args) => {
            mock(...args)
            return null
          }}
        </Consumer>
      </Provider>,
    )
    expect(mock).toHaveBeenCalledWith(
      // the state + dispatch object
      expect.objectContaining({
        dispatch: expect.any(Function),
        counter: expect.any(Number),
      }),
      // the value of the counter and the value of todos
      [0, []],
    )
  })
})

describe('transform', () => {
  it('it returns a function', () => {
    const transformed = transform(oldReducer)
    expect(typeof transformed).toBe('function')
  })
  it('calling the result returns a function', () => {
    const transformed = transform(oldReducer)
    const expectsState = transformed('action')
    expect(typeof expectsState).toBe('function')
  })

  it('calling the result of the curried reducer returns the final value', () => {
    const transformed = transform(oldReducer)
    const expectsState = transformed('action')
    const result = expectsState('state')
    // Implementation detail of oldReducer above
    expect(Object.keys(result)).toEqual(['state', 'action'])
  })
})
