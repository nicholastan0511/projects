import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import { changeFavorite, changeDone } from "../reducers/todoReducer"
import { setError } from "../reducers/erorrReducer"
import { useState } from "react"

const Sidebar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [dropArea, setDropArea] = useState(null)

  if (!user.token) {
    return null
  }

  const signOut = () => {
    dispatch(logout())
    window.localStorage.clear()
  }

  const handleDragOver = (e, tab) => {
    e.preventDefault()
    if (tab === 'favorites') {
      // console.log('im called')
      setDropArea('favorites')
    } else if (tab === 'done') {
      setDropArea('done')
    } else
      return
  }

  const handleOnDrop = (e, tab) => {
    let todo;
    if (e.dataTransfer.getData("todo"))
      todo = JSON.parse(e.dataTransfer.getData("todo"))
    else {
      setDropArea(null)
      return
    }

    if (tab === 'favorites' && todo.favorite === 'false') {
      dispatch(changeFavorite(todo))
      dispatch(setError(`${todo.title} added to favorites!`))
    } else if (tab === 'done' && todo.done === 'false') {
      dispatch(changeDone(todo))
      dispatch(setError(`${todo.title} has been finished!`))
    }

    setDropArea(null)
  }

  const handleDragLeave = () => {
    setDropArea(null)
  }

  return (
    <div className="sidebar">
      <div className="head">
        <div className="user-details">
          <div className="username">Welcome  
            <span className="name"> {user.username}!</span>
          </div>
          <span className="logout" onClick={signOut}><i className="gg-log-out"></i></span>
        </div>
      </div>  
      <div className="menu">
        <p className="title">MENU</p>
        <ul className="tabs">
          <li>
            <Link to="/" className="link">
              <p className="tab-icon">🔧</p>
              <span className="tab-name">
                Tasks
              </span>
            </Link>
          </li>
          <li>
            <Link to="favorites" className={`link ${ dropArea === 'favorites' ? 'activeTab' : '' }`} onDragOver={(e) => handleDragOver(e, 'favorites')} onDrop={(e) => handleOnDrop(e, "favorites")} onDragLeave={handleDragLeave}>
              <p className="tab-icon">❤️</p>
              <span className="tab-name">
                Favorites
              </span>
            </Link>  
          </li>
          <li>
            <Link to='finished' className={`link ${ dropArea === 'done' ? 'activeTab' : '' }`} onDragOver={(e) => handleDragOver(e, 'done')} onDrop={(e) => handleOnDrop(e, "done")} onDragLeave={handleDragLeave}>
              <p className="tab-icon">✅</p>
              <span className="tab-name">
                Finished
              </span>
            </Link>
          </li>
          <li>
            <Link to='pomodoro' className="link">
              <p className="tab-icon">🍅</p>
              <span className="tab-name">
                Pomodoro
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  ) 
}

export default Sidebar