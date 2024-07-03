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
import RegisterPage from "./components/RegisterPage"
import Error from "./components/Error"
import { Navigate } from "react-router-dom"
import { setError } from "./reducers/erorrReducer"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
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

      //setUser based on user data on client's localStorage, which was initialized through
      //either a login attempt or a registration
      dispatch(setUser(user))

      //setUserUrl so that user can be fetched to retrive its todo data
      userService.setUserUrl(user.id)

      //setToken so that config can be defined
      todoService.setToken(user.token)

      //initTodos based on user data that was initialized using setUserUrl
      dispatch(initTodos())

      //restart error
      dispatch(setError([]))
    } 
  }, [])

  console.log(user.token)

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Error/>
        <div className="container">
          <Routes>
            <Route path="/" element={!user.token ? <Navigate replace to='/login'/> : <ToDoList />} />
            <Route path="/favorites" element={user.token ? <Favorites /> : <Navigate replace to='/'/>} />
            <Route path="/finished" element={user.token ? <Finished /> : <Navigate replace to='/'/>} />
            <Route path="/register" element={!user.token ? <RegisterPage /> : <Navigate replace to='/'/>}/>
            <Route path="/login" element={!user.token ? <LoginPage /> : <Navigate replace to='/'/>}/>
            <Route path="*" element={<Navigate replace to='/' />} />
          </Routes>
          <TodoForm />
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
