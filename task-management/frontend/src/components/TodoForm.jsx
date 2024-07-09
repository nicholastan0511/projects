import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../reducers/todoReducer"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import TodoModal from './TodoModal'

export const updateDay = (deadline) => {
  const date = new Date(deadline)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days[date.getDay()]
}

const TodoForm = () => {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  if (!user.token) {
    return null
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const resetField = () => {
    setTitle('')
    setDeadline('')
  }

  const submit = (e) => {
    const form = e.currentTarget

    e.preventDefault()

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
    } else {
      dispatch(addTodo({ title, deadline: `${deadline} (${updateDay(deadline)})` }))
      handleClose()
      resetField()
      setValidated(false)

      //if user accessed the form through other endpoints
      if (location.pathname !== '/' && location.pathname !== '/pomodoro')
        navigate('/')
    }
  }


  return (
    <div>
      <motion.button
        onClick={() => show ? handleClose() : handleShow()} 
        className="todoform-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}

      >
        Add Task
      </motion.button>

      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {show && <TodoModal show={show} handleClose={handleClose} deadline={deadline} title={title} setTitle={setTitle} setDeadline={setDeadline} submit={submit} validated={validated} />}
      </AnimatePresence>

{/* 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit} className="todoForm" noValidate validated={validated}>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control type="text" required onChange={({ target }) => setTitle(target.value)} value={title}/>
              <Form.Control.Feedback type="invalid">
                Please provide a task.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Deadline</Form.Label>
              <Form.Control type="date" required onChange={({ target }) => setDeadline(target.value)} value={deadline} />
              <Form.Control.Feedback type="invalid">
                Please provide a deadline.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Button type="submit">add task</Button>
            </Form.Group>
          </Form>
        </Modal.Body>  
      </Modal> */}


    </div>
  )
}

export default TodoForm