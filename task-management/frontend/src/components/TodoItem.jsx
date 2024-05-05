import { changeDone, changeFavorite } from "../reducers/todoReducer";
import { useDispatch } from "react-redux";

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
        <li onClick={() => dispatch(changeDone(todo))}>
          {prop}
          <p>{todo.title}</p>
          <p>deadline: {todo.deadline}</p>
        </li>
        <button onClick={() => dispatch(changeFavorite(todo))}>{heart}</button>
      </>
    )
}

export default TodoItem
