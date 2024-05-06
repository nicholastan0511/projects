import ToDoList from "./components/ToDoList"
import TodoForm from "./components/TodoForm"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initTodos } from "./reducers/todoReducer"
import LoginPage from './components/LoginPage'
import { setUser } from "./reducers/userReducer"
import todoService from "./services/todoService"
import userService from './services/userService'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  //to keep user logged-in when the page is refreshed
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      userService.setUserUrl(user.id)
      todoService.setToken(user.token)
    } 
    dispatch(initTodos())
  }, [])

  const logout = () => {
    dispatch(setUser({}))
    window.localStorage.clear()
  }

  if (!user.token)
    return <LoginPage />

  return (
    <>
      <p>
        Welcome {user.username}! 
        <button onClick={logout}>log out</button>
      </p>
      <TodoForm />
      <ToDoList />
    </>
  )
}

export default App
