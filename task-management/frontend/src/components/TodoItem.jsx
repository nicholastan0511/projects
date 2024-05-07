import { changeDone, changeFavorite } from "../reducers/todoReducer";
import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { deleteOne } from "../reducers/todoReducer";
import { useState } from "react";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  const [additionalClass, setClass] = useState('')

  const heart = todo.favorite == 'true'
    ? '❤️'
    : '🤍'

  const prop = todo.done == 'true'
    ? 'the task is done'
    : null

  const handleClick = () => {
    if (todo.done === 'false') {
      setClass('checked')
      setTimeout(() => {
        dispatch(changeDone(todo))
      }, 2000)
    } else {
      dispatch(changeDone(todo))
    }

  }

  return (
      <>
        <ListGroup.Item className={`todoItem ${additionalClass}`}>
          <div onClick={handleClick} className={'todo-info'}>
            {prop}
            <p>{todo.title}</p>
            <p>deadline: {todo.deadline}</p>
          </div>
          <div className="buttonGroup">
            <Button onClick={() => dispatch(changeFavorite(todo))} size="md" variant="info">{heart}</Button>
            <Button onClick={() => dispatch(deleteOne(todo))} size="md" variant="warning">🗑</Button>
          </div>
        </ListGroup.Item>
      
      </>
    )
}

export default TodoItem
