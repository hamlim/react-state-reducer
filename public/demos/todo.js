import React, { Fragment } from 'react'

import createStore from '../../src/createStore.js'

const INITIAL_STATE = { todos: [] }

const todoReducer = action => (state = INITIAL_STATE) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length,
            text: action.payload,
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
    default:
      return state
  }
}

const { Provider, Consumer } = createStore(todoReducer)

const handleSubmit = dispatch => event => {
  event.preventDefault()
  const input = [...event.target.elements].find(ele => ele.name === 'todo')
  dispatch({ type: 'ADD_TODO', payload: input.value })
  input.value = ''
}

const App = () => (
  <Provider>
    <Consumer>
      {({ todos, dispatch }) => (
        <Fragment>
          <form onSubmit={handleSubmit(dispatch)}>
            <label>
              <input name="todo" placeholder="Do the dishes" />
              Enter a todo
            </label>
            <button type="submit">Add Todo</button>
          </form>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.completed ? <s>{todo.text}</s> : <span>{todo.text}</span>}
                <button
                  aria-label={todo.completed ? 'Mark todo as uncompleted' : 'Mark todo as completed'}
                  onClick={_ => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
                >
                  {todo.completed ? `🔁` : `✅`}
                </button>
                <button
                  aria-label="Remove todo"
                  onClick={_ => dispatch({ type: 'REMOVE_TODO', payload: { id: todo.id } })}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </Consumer>
  </Provider>
)

export default App
