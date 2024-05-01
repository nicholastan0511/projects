import { changeDone, changeFavorite } from "../reducers/todoReducer";
import { useDispatch } from "react-redux";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()

  const heart = todo.favorite == 'true'
    ? '❤️'
    : '🤍'

  return (
      <>
        <li>
          <p>{todo.title}</p>
          <p>deadline: {todo.deadline}</p>
          <button onClick={() => dispatch(changeFavorite(todo))}>{heart}</button>
        </li>
      </>
    )
}

export default TodoItem
