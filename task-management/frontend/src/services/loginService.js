import axios from "axios";

const loginUrl = '/api/login'

const login = async (creds) => {
  const response = await axios.post(loginUrl, creds)
  return response.data
}

export default { login }