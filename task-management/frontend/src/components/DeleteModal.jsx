import { Modal, Button } from "react-bootstrap";
import { deleteOne } from "../reducers/todoReducer";
import { useDispatch } from "react-redux";

const DeleteModal = ({ todo, show, handleClose }) => {
  const dispatch = useDispatch()

  const handleYes = (e) => {
    e.preventDefault()
    dispatch(deleteOne(todo))
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="del-modal">Confirm to delete task '{todo.title}'</Modal.Title>  
      </Modal.Header> 
      <Modal.Body className="delete-btn-group">
        <Button onClick={handleYes} variant="primary">Yes</Button>  
        <Button onClick={handleClose} variant="warning">No</Button>
      </Modal.Body>   
    </Modal>
  )

}

export default DeleteModal