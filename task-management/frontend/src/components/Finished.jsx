import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

const Finished = () => {

    const todos = useSelector(state => state.todos)

    if (!todos) 
        return <div>fetching...</div>

    const finished = todos.filter(todo => todo.done == 'true')

    return (
        <div className="finished">
            <span className="todolist-title">Finished tasks ✅</span>
            {finished.length > 0 
                ? (
                    <div className="tdl-container">
                        {finished.map(todo => 
                            <TodoItem key={todo.id} todo={todo} />
                        )}
                    </div> 
                  )
                : <div>You have things to get done!</div>
            }
        </div>
      )
}

export default Finished