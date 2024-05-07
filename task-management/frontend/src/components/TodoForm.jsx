import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../reducers/todoReducer"
import Error from "./Error"
import { Button, Modal, Form } from "react-bootstrap"

const TodoForm = () => {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()

  const resetField = () => {
    setTitle('')
    setDeadline('')
  }

  const submit = (e) => {
    const form = e.currentTarget

    console.log(form.checkValidity())

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      dispatch(addTodo({ title, deadline }))
      handleClose()
      resetField()
    }

    setValidated(true)
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

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
      </Modal>


    </div>
  )
}

export default TodoForm