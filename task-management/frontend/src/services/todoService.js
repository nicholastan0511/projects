import axios from 'axios'
export const baseUrl = '/api/todos'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const fetchAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addTask = async (obj) => {

  const config = {
    headers: { authorization: token }
  }

  const response = await axios.post(baseUrl, { ...obj, favorite: 'false', done: 'false' }, config)
  return response.data
}

const favorite = async (obj) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${obj.id}`, { favorite: obj.favorite }, config)
  return response.data
}

const done = async (obj) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${obj.id}`, { done: obj.done }, config)
  return response.data
}

const deleteTodo = async (obj) => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${obj.id}`, config)
  return response.data
}

const modifyTask = async (obj) => {
  const config = {
    headers: { authorization: token }
  }

  console.log(config)

  const response = await axios.put(`${baseUrl}/${obj.id}`, obj, config)
  return response.data
}

export default {
  fetchAll,
  addTask,
  favorite,
  done,
  deleteTodo,
  setToken,
  modifyTask
}