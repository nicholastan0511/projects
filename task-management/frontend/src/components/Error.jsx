import { useSelector, useDispatch } from "react-redux"
import { Alert } from "react-bootstrap"
import { setError } from "../reducers/erorrReducer"

const Error = () => {
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()

  if (error == '') 
    return null
    
  setTimeout(() => {
    dispatch(setError(''))
  }, 5000)

  return <Alert className="error" variant="warning">{error}</Alert>
  

}

export default Error