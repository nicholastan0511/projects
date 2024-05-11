import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { modifyTask } from "../reducers/todoReducer"
import { updateDay } from "./TodoForm"

const ModifyTaskModal = ({ todo, show, handleClose }) => {
  const dispatch = useDispatch()
  const [task, setTask] = useState(todo.title)
  const [deadline, setDeadline] = useState(todo.deadline.slice(0, 10))
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget
 
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)

      //if both fields remain as they are
    } else if (todo.title === task && todo.deadline.slice(0, 10) === deadline) {
      handleClose()
      setValidated(false)
    } else {
      dispatch(modifyTask({
        id: todo.id,
        deadline: `${deadline} (${updateDay(deadline)})`,
        title: task
      }))
      handleClose()
      setValidated(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        Modify task '{todo.title}'
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} validated={validated} noValidate className="todoForm">
          <Form.Group>
            <Form.Label>Task name</Form.Label>
            <Form.Control type="text" required onChange={({ target }) => setTask(target.value)} value={task}/>
            <Form.Control.Feedback type="invalid">Please provide a task name.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <Form.Control type="date" required onChange={({ target }) => setDeadline(target.value)} value={deadline} />
            <Form.Control.Feedback type="invalid">Please provide a deadline.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button type='submit'>Modify task</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModifyTaskModal