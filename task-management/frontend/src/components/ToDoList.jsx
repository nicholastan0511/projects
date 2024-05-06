import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { ListGroup } from "react-bootstrap";


const ToDoList = () => {
  const todos = useSelector(state => state.todos)

  if (!todos)
    return <div>fetching...</div>

  const done = todos.filter(todo => todo.done == 'true')
  const undone = todos.filter(todo => todo.done == 'false')

  return (
    <div>
      <div>
        To do list
        <ListGroup>
          {undone.map(todo => 
            <TodoItem key={todo.id} todo={todo} />
          )}
        </ListGroup>
      </div>
      <div>
        Finished Tasks
        <ListGroup>
          {done.map(todo =>
            <TodoItem key={todo.id} todo={todo} />
          )}
        </ListGroup>
      </div>
    </div>
  )  
}

export default ToDoList;