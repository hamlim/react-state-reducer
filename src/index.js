import React from 'react'
import { render } from 'react-dom'
import App from '../demo/counter.js'
import Todo from '../demo/todo.js'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const A = () => (
  <div style={styles}>
    <App />
    <Todo />
    <h2>Start editing to see some magic happen {'\u2728'}</h2>
  </div>
)

render(<A />, document.getElementById('root'))
