import React, { Fragment } from 'react'

import createStore from '../../src/createStore.js'

const INITIAL_STATE = { todos: [], inputValue: '' }

const todoReducer = action => (state = INITIAL_STATE) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        inputValue: '',
        todos: [
          ...state.todos,
          {
            id: state.todos.length,
            text: state.inputValue,
            completed: false,
          },
        ],
      }
    }
    case 'TOGGLE_TODO': {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
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
    case 'REMOVE_TODO': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      }
    }
    case 'UPDATE_INPUT': {
      return {
        ...state,
        inputValue: action.payload,
      }
    }
    default:
      return state
  }
}

const { Provider, Consumer } = createStore(todoReducer)

class TodoApp extends React.Component {
  handleChange = e => {
    this.props.dispatch({
      type: 'UPDATE_INPUT',
      payload: e.target.value,
    })
  }

  addTodo = e => {
    e.preventDefault()
    this.props.dispatch({
      type: 'ADD_TODO',
      payload: null,
    })
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input onChange={this.handleChange} value={this.props.inputValue} name="todo" placeholder="Do the dishes" />
            Enter a todo
          </label>
          <button type="button" onClick={this.addTodo}>
            Add Todo
          </button>
        </form>
        <ul>
          {this.props.todos.map(todo => (
            <li key={todo.id}>
              {todo.completed ? <s>{todo.text}</s> : <span>{todo.text}</span>}
              <button
                aria-label={todo.completed ? 'Mark todo as uncompleted' : 'Mark todo as completed'}
                onClick={_ => this.props.dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
              >
                {todo.completed ? `🔁` : `✅`}
              </button>
              <button
                aria-label="Remove todo"
                onClick={_ => this.props.dispatch({ type: 'REMOVE_TODO', payload: { id: todo.id } })}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

const App = () => (
  <Provider>
    <Consumer>{ctx => <TodoApp {...ctx} />}</Consumer>
  </Provider>
)

export default App
