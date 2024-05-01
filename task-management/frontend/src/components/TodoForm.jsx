import { useState } from "react"
import todoService from "../services/todoService"
import { useDispatch } from "react-redux"
import { addTodo } from "../reducers/todoReducer"

const TodoForm = () => {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')

  const dispatch = useDispatch()

  const resetField = () => {
    setTitle('')
    setDeadline('')
  }

  const submit = (e) => {
    e.preventDefault()
    dispatch(addTodo({ title, deadline }))
    resetField()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input type="text" onChange={({ target }) => setTitle(target.value)} value={title}/>
        </div>
        <div>
          <input type="date" onChange={({ target }) => setDeadline(target.value)} value={deadline} />
        </div>
        <div>
          <button type="submit">add task</button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm