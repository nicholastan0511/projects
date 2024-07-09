import axios from "axios";

let userUrl = '/api/users/'
let id;

const setUserUrl = (id) => {

  //only incude chars until the original length of userUrl then append the id
  userUrl = userUrl.substring(0, 11) + id
  id = id
}

const fetchUser = async () => {
  const user = await axios.get(userUrl)
  return user.data
}

const regisUser = async (userCreds) => {
  const user = await axios.post('/api/users', userCreds)
  return user.data
}

export default {
  fetchUser,
  setUserUrl,
  regisUser,
  id
}