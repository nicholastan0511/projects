import { motion } from "framer-motion"
import Backdrop from "./Backdrop"
import { Form, Button } from "react-bootstrap"

const dropIn = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 100
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
}

const TodoModal = ({ handleClose, submit, setTitle, setDeadline, title, deadline, validated }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation(e)}
        className="todo-modal"
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <div className="modal-body">
          <Form onSubmit={submit} className="todoForm" noValidate validated={validated}>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control type="text" required placeholder='Cut down some trees' onChange={({ target }) => setTitle(target.value)} value={title}/>
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
        </div>  

      </motion.div>
    </Backdrop>
  )
}

export default TodoModal;