import axios from "axios";

let userUrl = 'http://localhost:3003/api/user/'

const setUserUrl = (id) => {

  //only incude chars until the original length of userUrl then append the id
  userUrl = userUrl.substring(0, 31) + id
}

const fetchUser = async () => {
  const user = await axios.get(userUrl)
  return user.data
}

const regisUser = async (userCreds) => {
  const user = await axios.post('http://localhost:3003/api/user', userCreds)
  return user.data
}

export default {
  fetchUser,
  setUserUrl,
  regisUser
}