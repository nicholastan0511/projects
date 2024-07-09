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
    },
    addPomodoro: (state, action) => {
      state.map(todo => {
        if (todo.id === action.payload.id) {
          if (todo.pomodoro) {
            todo.pomodoro = action.payload.pomodoro
          } else {
            todo.pomodoro = 1
          }
        }
      })
    }
  }
})

export const { setTodos, appendTodo, alterFavorite, alterDone, del, modify, addPomodoro } = todoSlice.actions 

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
    dispatch(alterFavorite({ ...obj, favorite: obj.favorite === 'true' ? 'false' : 'true', user: userService.id }))
    await todoService.favorite(obj)
    // console.log(response, obj)
   
  }
}

export const changeDone = (obj) => {
  return async dispatch => {
    dispatch(alterDone({ ...obj, done: obj.done === 'true' ? 'false' : 'true', user: userService.id }))
    await todoService.done(obj)
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
      // console.log(response)
      dispatch(modify(response))
    } catch (err) {
      dispatch(setError('errrr'))
    }
  }
}

export const addPomodoroCount = (obj) => {
  return async dispatch => {
    try {
      const response = await todoService.pomodoro(obj)
      dispatch(addPomodoro(obj))
      console.log(response)
    } catch (err) {
      dispatch(setError(err.message))
    }
  }
}

export default todoSlice.reducer