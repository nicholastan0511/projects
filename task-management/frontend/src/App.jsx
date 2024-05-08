import ToDoList from "./components/ToDoList"
import TodoForm from "./components/TodoForm"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initTodos } from "./reducers/todoReducer"
import LoginPage from './components/LoginPage'
import { setUser } from "./reducers/userReducer"
import todoService from "./services/todoService"
import userService from './services/userService'
import Favorites from "./components/Favorites"
import Finished from "./components/Finished"
import Error from "./components/Error"
import { setError } from "./reducers/erorrReducer"
import Sidebar from "./components/Sidebar"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

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
    dispatch(setError(''))
  }, [])

  if (!user.token)
    return  (
      <div className="app">
        <Error/>
        <LoginPage />
      </div>
    )

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Error/>
        <div className="container">
          <Routes>
            <Route path="/" element={<ToDoList />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/finished" element={<Finished />} />
          </Routes>
          <TodoForm />
        </div>
      </div>
    </Router>
  )
}

export default App
