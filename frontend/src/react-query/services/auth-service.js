import axios, { endpoints } from '../../util/axios'

export const login = async (credential) => {
  const res = await axios.post(endpoints.auth.login, credential)

  return res.data
}

export const register = async (user) => {
  const res = await axios.post(endpoints.auth.login, user)

  return res.data
}
