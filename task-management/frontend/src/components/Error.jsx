import { useSelector, useDispatch } from "react-redux"
import { setError } from "../reducers/erorrReducer"

const Error = () => {
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()

  setTimeout(() => {
    dispatch(setError(''))
  }, 5000)

  if (error)
    return <div>{error}</div>

  return null
}

export default Error