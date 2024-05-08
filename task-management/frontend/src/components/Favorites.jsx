import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"
import TodoItem from "./TodoItem"

const Favorites = () => {
  const todos = useSelector(state => state.todos)

  if (!todos) 
    return <div>fetching...</div>

  const favorites = todos.filter(todo => todo.favorite == 'true')
  
  return (
    <div className="favorites">
        <span className="todolist-title">Favorite tasks</span>
        {favorites.length > 0 
            ? (
                <ListGroup>
                    {favorites.map(todo => 
                        <TodoItem key={todo.id} todo={todo} />
                    )}
                </ListGroup> 
              )
            : <div>Currently no favorites!</div>
        }
    </div>
  )
}

export default Favorites
