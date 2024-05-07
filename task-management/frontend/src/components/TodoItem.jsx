import { changeDone, changeFavorite } from "../reducers/todoReducer";
import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { deleteOne } from "../reducers/todoReducer";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()

  const heart = todo.favorite == 'true'
    ? '❤️'
    : '🤍'

  const prop = todo.done == 'true'
    ? 'the task is done'
    : null

  return (
      <>
        <ListGroup.Item className="todoItem">
          <div onClick={() => dispatch(changeDone(todo))}>
            {prop}
            <p>{todo.title}</p>
            <p>deadline: {todo.deadline}</p>
          </div>
          <Button onClick={() => dispatch(changeFavorite(todo))} size="sm" variant="info">{heart}</Button>
          <Button onClick={() => dispatch(deleteOne(todo))} size="sm" variant="warning">🗑</Button>
        </ListGroup.Item>
      
      </>
    )
}

export default TodoItem
