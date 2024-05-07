import ToDoList from "./components/ToDoList"
import TodoForm from "./components/TodoForm"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initTodos } from "./reducers/todoReducer"
import LoginPage from './components/LoginPage'
import { setUser } from "./reducers/userReducer"
import todoService from "./services/todoService"
import userService from './services/userService'
import { Button } from "react-bootstrap"
import Error from "./components/Error"

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
    <div className="app">
      <Error/>
      <p>
        Welcome {user.username}! 
        <Button onClick={logout}>log out</Button>
      </p>
      <TodoForm />
      <ToDoList />
    </div>
  )
}

export default App
