import axios from "axios";

let userUrl = 'http://localhost:3003/api/user/'

const setUserUrl = (id) => {
  userUrl += id
}

const fetchUser = async () => {
  const user = await axios.get(userUrl)
  return user.data
}

export default {
  fetchUser,
  setUserUrl
}