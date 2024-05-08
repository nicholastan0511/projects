import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(logout())
    window.localStorage.clear()
  }

  return (
    <div className="sidebar">
      <div className="head">
        <div className="user-details">
          <div className="username">Welcome  
            <span className="name"> {user.username}!</span>
          </div>
          <span className="logout" onClick={signOut}><i className="gg-log-out"></i></span>
          <span><i className="gg-arrow-left"></i></span>
        </div>
      </div>  
      <div className="menu">
        <p className="title">MENU</p>
        <ul>
          <li>
            <Link to="/" className="link">
              <i className="gg-list"></i>
              <span>
                Tasks
              </span>
            </Link>
          </li>
          <li>
            <Link to="favorites" className="link">
              <i className="gg-card-hearts"></i>
              <span>
                Favorites
              </span>
            </Link>  
          </li>
          <li>
            <Link to='finished' className="link">
              <i className="gg-check-r"></i>
              <span>
                Finished
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) 
}

export default Sidebar