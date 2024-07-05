import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import todoSlice from './reducers/todoReducer.js'
import errorSlice from './reducers/erorrReducer.js'
import userSlice from './reducers/userReducer.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    todos: todoSlice,
    error: errorSlice,
    user: userSlice
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
)
