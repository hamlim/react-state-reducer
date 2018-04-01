import React from 'react'
import { render } from 'react-testing-library'
import { CreateStore } from '../index.js'

describe('CreateStore component', () => {
  it('calls children with a provider and consumer', () => {
    let components
    render(
      <CreateStore
        reducer={() => (s = { counter: 0 }) => s}
      >
        {args => {
          components = args
          return null
        }}
      </CreateStore>,
    )

    expect(Object.keys(components)).toEqual([
      'Provider',
      'Consumer',
    ])
  })
  it('correctly updates providers and consumers when swapping reducers', () => {
    const a = () => (s = { text: 'Reducer A' }) => s
    const b = () => (s = { text: 'Reducer B' }) => s
    const { container, getByTestId } = render(
      <CreateStore reducer={a}>
        {({ Provider, Consumer }) => (
          <Provider>
            <Consumer>
              {({ text }) => (
                <div data-testid="container">{text}</div>
              )}
            </Consumer>
          </Provider>
        )}
      </CreateStore>,
    )
    expect(getByTestId('container').textContent).toEqual(
      'Reducer A',
    )
    render(
      <CreateStore reducer={b}>
        {({ Provider, Consumer }) => (
          <Provider>
            <Consumer>
              {({ text }) => (
                <div data-testid="container">{text}</div>
              )}
            </Consumer>
          </Provider>
        )}
      </CreateStore>,
      { container },
    )
    expect(getByTestId('container').textContent).toEqual(
      'Reducer B',
    )
  })
})
