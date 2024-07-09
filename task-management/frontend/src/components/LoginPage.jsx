import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const clearField = () => {
  //   setUsername('')
  //   setPassword('')
  // }

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
      <div className="welcome-loginpage">
        <h1>Login</h1>
        <p>Welcome back my friend! 🏄</p>
      </div>
      <Form onSubmit={onSubmit} className="loginForm" validated={validated} noValidate>
        <Form.Group>
            <Form.Label className="form-login-label" >Username</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={username}
            placeholder="Bob"
            onChange={({ target }) => setUsername(target.value) }
            required
            />
            <Form.Control.Feedback type="invalid">Please insert valid username</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <Form.Label className="form-login-label">Password</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Ross"
            required
            />
            <Form.Control.Feedback type="invalid">Please insert password</Form.Control.Feedback>
        </Form.Group>
        <div>
          <Button variant="primary" type="submit" className="btn-loginpage">
            login
          </Button>
        </div>
      </Form>
      <div className="linebreak">
        <span></span>
        <p>OR</p>
        <span></span>
      </div>
      <span className="account">Don't have an account? 
        {/* <Button variant="primary" size='sm' onClick={() => navigate('/register')} className="btn-loginpage">register here!</Button> */}
        <Link to='/register'>Register here!</Link>
      </span>
    </div>
  ) 
}

export default LoginPage