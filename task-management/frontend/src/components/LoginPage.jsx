import { Form, Button } from "react-bootstrap"
import loginService from "../services/loginService"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import todoService from "../services/todoService" 

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const clearField = () => {
    setUsername('')
    setPassword('')
  }

  const onSubmit = async (e) => { 
    e.preventDefault()
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    dispatch(setUser(user))
    todoService.setToken(user.token)
    clearField()
  }

  return (
    <div className="loginPage">
      <Form onSubmit={onSubmit} className="loginForm">
        <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value) }
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            login
          </Button>
        </div>
      </Form>
    </div>
  ) 
}

export default LoginPage