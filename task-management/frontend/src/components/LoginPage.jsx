import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const clearField = () => {
    setUsername('')
    setPassword('')
  }

  const onSubmit = async (e) => { 
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {    
      e.preventDefault()
      dispatch(loginUser({ username, password }))
    }
    setValidated(true)
  }

  return (
    <div className="loginPage">
      <Form onSubmit={onSubmit} className="loginForm" validated={validated} noValidate>
        <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value) }
            required
            />
            <Form.Control.Feedback type="invalid">Please insert valid username</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
            />
            <Form.Control.Feedback type="invalid">Please insert password</Form.Control.Feedback>
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            login
          </Button>
        </div>
      </Form>
      <span className="account">Don't have an account? 
        <Button variant="primary" size='sm' onClick={() => navigate('/register')}>register here!</Button>
      </span>
    </div>
  ) 
}

export default LoginPage