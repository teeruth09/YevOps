import axios from 'axios'

import { HOST_API } from '../global-config'

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API })
// console.log("HOST_API", HOST_API);  // Check if this is the correct base URL


// Set http://localhost:5555/ as the default base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555/',
});



axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
)

export default axiosInstance

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    register: 'register',
    login: 'login',
  },
}
