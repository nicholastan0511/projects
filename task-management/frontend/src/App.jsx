import ToDoList from "./components/ToDoList"
import TodoForm from "./components/TodoForm"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initTodos } from "./reducers/todoReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initTodos())
  }, [])


  return (
    <>
      <TodoForm />
      <ToDoList />
    </>
  )
}

export default App
