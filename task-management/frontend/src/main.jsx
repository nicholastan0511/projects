import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import todoSlice from './reducers/todoReducer.js'

const store = configureStore({
  reducer: {
    todos: todoSlice
  }
})

console.log(store.getState())


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
