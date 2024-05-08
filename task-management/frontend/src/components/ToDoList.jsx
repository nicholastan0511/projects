import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { ListGroup } from "react-bootstrap";


const ToDoList = () => {
  const todos = useSelector(state => state.todos)

  if (!todos)
    return <div>fetching...</div>

  const undone = todos.filter(todo => todo.done == 'false')

  return (
    <div>
        <span className="todolist-title">To do list</span>
        {undone.length > 1
          ? (
            <ListGroup>
              {undone.map(todo => 
                <TodoItem key={todo.id} todo={todo} />
              )}
            </ListGroup>
          )
          : <div>No tasks as of current!</div>
        }
       
    </div>
  )  
}

export default ToDoList;