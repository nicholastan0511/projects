import { useSelector, useDispatch } from "react-redux"
import { Alert } from "react-bootstrap"
import { setError } from "../reducers/erorrReducer"

const Error = () => {
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()

  setTimeout(() => {
    dispatch(setError(''))
  }, 5000)

  if (error)
    return <Alert className="error" variant="warning">{error}</Alert>

  return null
}

export default Error