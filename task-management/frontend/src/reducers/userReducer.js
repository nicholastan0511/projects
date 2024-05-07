import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";
import { setError } from "./erorrReducer";
import todoService from "../services/todoService";

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
      dispatch(setUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      todoService.setToken(user.token)
    } catch (err) {
      console.log(err)
      dispatch(setError('Invalid username or password!'))
    }
  }
} 

export default userSlice.reducer