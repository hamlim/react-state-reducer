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
