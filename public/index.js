import React from 'react'
import { render } from 'react-dom'
import Counter from './demos/counter.js'
import Todo from './demos/todo.js'
import Async from './demos/async-loader.js'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const App = () => (
  <div style={styles}>
    <Counter />
    <Todo />
    <Async />
    <h2>Start editing to see some magic happen {'\u2728'}</h2>
  </div>
)

render(<App />, document.getElementById('root'))
