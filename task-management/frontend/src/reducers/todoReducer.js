import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todoService";
import { setError } from "./erorrReducer";

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setTodos: (_state, action) => {
      return action.payload
    },
    appendTodo: (state, action) => {
      state.push(action.payload)
    },
    alterFavorite: (state, action) => {
      state.map(todo => {
        if (todo.id == action.payload.id) {
          todo.favorite = action.payload.favorite
        }
      })
    },
    alterDone: (state, action) => {
      state.map(todo => {
        if (todo.id == action.payload.id) {
          todo.done = !todo.done
        }
      })
    }
  }
})

export const { setTodos, appendTodo, alterFavorite, alterDone } = todoSlice.actions 

export const initTodos = () => {
  return async dispatch => {
    const todos = await todoService.fetchAll()
    dispatch(setTodos(todos))
  }
}

export const addTodo = (obj) => {
  return async dispatch => {
    try {
      const response = await todoService.addTask(obj)
      dispatch(appendTodo(response))
    } catch (err) {
      console.log(err.response.data.error)
      dispatch(setError(err.response.data.error))
    }
  }
}

export const changeFavorite = (obj) => {
  return async dispatch => {
    const response = await todoService.favorite(obj)
    dispatch(alterFavorite(response))
  }
}

export const changeDone = (obj) => {
  return async dispatch => {
    await todoService.done(obj)
    dispatch(alterDone(obj))
  }
}

export default todoSlice.reducer