import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { regisUser } from "../reducers/userReducer"
import { setError } from "../reducers/erorrReducer"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    const form = e.currentTarget
    e.preventDefault()
    
    if (form.checkValidity() === false) {
        e.stopPropagation()
        setValidated(true)
    } else if (password !== confirmPassword) {
        dispatch(setError('Confirmation password does not match!'))
    } else {
        dispatch(regisUser({ username, password }))
        navigate('/')
    }
  }

  return (
    <div className="loginPage regisPage">
      <Form onSubmit={handleSubmit} className="loginForm" validated={validated} noValidate>
        <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value) }
            required
            />
            <Form.Control.Feedback type="invalid">Please insert valid email</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <Form.Label>email:</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={email}
            onChange={({ target }) => setEmail(target.value) }
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
        <Form.Group>
            <Form.Label>confirm password:</Form.Label>
            <Form.Control
            type="password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            required
            />
            <Form.Control.Feedback type="invalid">Please confirm your password</Form.Control.Feedback>
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            register
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default RegisterPage