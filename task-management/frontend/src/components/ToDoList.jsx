import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";


const ToDoList = () => {
  const todos = useSelector(state => state.todos)

  if (!todos)
    return <div>fetching...</div>

  return (
    <div>
      <ul>
        {todos.map(todo => 
          <TodoItem key={todo.id} todo={todo}/>
        )}
      </ul>
    </div>
  )  
}

export default ToDoList;