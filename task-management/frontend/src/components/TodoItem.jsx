import { changeDone, changeFavorite } from "../reducers/todoReducer";
import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import ModifyTaskModal from "./ModifyTaskModal";
import { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal";
import Timer from "./Timer";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  const [additionalClass, setClass] = useState('')
  const [show, setShow] = useState(false)
  const [showModify, setShowModify] = useState(false)

  const handleClose = () => { setShow(false) }
  const handleShow = () => { setShow(true) }

  const handleCloseModify = () => { setShowModify(false) }
  const hanldeShowModify = () => { setShowModify(true) }

  const heart = todo.favorite == 'true'
    ? '❤️'
    : '🤍'  

  useEffect(() => {
    if (todo.done == 'true')
      setClass('checked')
  }, [])

  const handleClick = () => {
    if (todo.done === 'false') {
      setClass('checked')
      setTimeout(() => {
        dispatch(changeDone(todo))
      }, 1000)
    } else {
      setClass('')
      setTimeout(() => {
        dispatch(changeDone(todo))
      }, 1000)
    }
  }

  return (
      <>
        <ListGroup.Item className={todo.done === 'false' ? `todoItem ${additionalClass}` : `todoItem ${additionalClass}`}>
          <div onClick={handleClick} className={'todo-info'}>
            <p>{todo.title}</p>
            <p>Deadline: <span className="deadline">{todo.deadline}</span></p>
            <p>{ todo.pomodoro ? `You have done ${todo.pomodoro} pomodoro session(s) on this task!` : null }</p>
            <Timer deadlineWithDay={todo.deadline} done={todo.done} />
          </div>
          <div className="buttonGroup">
            <Button onClick={() => dispatch(changeFavorite(todo))} size="md" variant="info">{heart}</Button>
            <Button onClick={handleShow} size="md" variant="warning">🗑</Button>
            <Button onClick={hanldeShowModify}>🛠️</Button>
            <ModifyTaskModal todo={todo} show={showModify} handleClose={handleCloseModify} />
            <DeleteModal todo={todo} show={show} handleClose={handleClose} />
          </div>
        </ListGroup.Item>
      
      </>
    )
}

export default TodoItem
