import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todoService";
import { setError } from "./erorrReducer";
import userService from "../services/userService";

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
          todo.done = action.payload.done
        }
      })
    },
    del: (state, action) => {
      return state.filter(todo => todo.id != action.payload.id)
    },
    modify: (state, action) => {
      state.map(todo => {
        if (todo.id === action.payload.id) {
          todo.deadline = action.payload.deadline
          todo.title = action.payload.title
        }
      })
    }
  }
})

export const { setTodos, appendTodo, alterFavorite, alterDone, del, modify } = todoSlice.actions 

export const initTodos = () => {
  return async dispatch => {
    const user = await userService.fetchUser()
    dispatch(setTodos(user.todos))
  }
}

export const addTodo = (obj) => {
  return async dispatch => {
    try {
      const response = await todoService.addTask(obj)
      dispatch(appendTodo(response))
    } catch (err) {
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
    const response = await todoService.done(obj)
    dispatch(alterDone(response))
  }
}

export const deleteOne = (obj) => {
  return async dispatch => {
    await todoService.deleteTodo(obj)
    dispatch(del(obj))
  }
}

export const modifyTask = (obj) => {
  return async dispatch => {
    try {
      const response = await todoService.modifyTask(obj)
      console.log(response)
      dispatch(modify(response))
    } catch (err) {
      dispatch(setError('errrr'))
    }
  }
}

export default todoSlice.reducer