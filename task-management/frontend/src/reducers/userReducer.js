import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";
import { setError } from "./erorrReducer";
import todoService from "../services/todoService";
import userService from "../services/userService";
import { initTodos } from "./todoReducer";

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => action.payload,
    logout: (state, action) => {
      return {}
    }
  } 
})

export const { setUser, logout } = userSlice.actions

export const loginUser = (userCreds) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userCreds)

      //initialize user url so that initTodos can retrieve user's todolist
      userService.setUserUrl(user.id)

      //setUser so that App.jsx can recognize that user has been initialized
      dispatch(setUser(user))

      //reinitialize user's todolist based on user's information
      dispatch(initTodos())

      //save user information on client's side so that user remains logged-in on page refresh
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      //setToken for defining config
      todoService.setToken(user.token)
    } catch (err) {
      dispatch(setError('Invalid username or password!'))
    }
  }
} 

export const regisUser = (userCreds) => {
  return async dispatch => {
    try {
      const user = await userService.regisUser(userCreds)

      //initialize user url so that initTodos can retrieve user's todolist
      userService.setUserUrl(user.id)
      
      //setUser so that App.jsx can recognize that user has been initialized
      dispatch(setUser(user))

      //reinitialize user's todolist based on user's information
      dispatch(initTodos())

      //save user information on client's side so that user remains logged-in on page refresh
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      //setToken for defining config
      todoService.setToken(user.token)
    } catch (err) {
      dispatch(setError('Username taken!'))
    }
  }
}

export default userSlice.reducer