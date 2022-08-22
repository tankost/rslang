import axios from "axios"

const baseUrl = 'http://localhost:3001'

interface NewUser  {
  email: string
  password :string
}

const signIn = async (user: NewUser) => {
  const request = await axios.post(`${baseUrl}/signin`, user)
  return request.data
}

export default {
  signIn
}