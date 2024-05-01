import axios from 'axios'
const baseUrl = '/api/todos'

const fetchAll = async () => {
  const response = await axios.get(`http://localhost:3003${baseUrl}`)
  return response.data
}

const addTask = async (obj) => {
  const response = await axios.post(`http://localhost:3003${baseUrl}`, { ...obj, favorite: 'false', done: 'false' })
  return response.data
}

const favorite = async (obj) => {
  const response = await axios.put(`http://localhost:3003${baseUrl}/${obj.id}`, { favorite: obj.favorite })
  return response.data
}

const done = async (obj) => {
  await axios.put(`http://localhost:3003${baseUrl}/${obj.id}`, { done: obj.done })
}

export default {
  fetchAll,
  addTask,
  favorite,
  done
}