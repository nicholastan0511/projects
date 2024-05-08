import { changeDone, changeFavorite } from "../reducers/todoReducer";
import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { deleteOne } from "../reducers/todoReducer";
import { useState, useEffect } from "react";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  const [additionalClass, setClass] = useState('')

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
