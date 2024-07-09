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
        <span className="todolist-title">To do list 🔧</span>
        {undone.length > 0
          ? (
            <div className='tdl-container'>
              {undone.map(todo => 
                <TodoItem key={todo.id} todo={todo} />
              )}
            </div>
          )
          : <div>No tasks as of current!</div>
        }
       
    </div>
  )  
}

export default ToDoList;