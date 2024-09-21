import axios, { endpoints } from '../../util/axios'

// export const login = async (credential) => {
//   const res = await axios.post(endpoints.auth.login, credential)

//   return res.data
// }

export const login = async (credential) => {
  try {
    const res = await axios.post(endpoints.auth.login, credential)

    if (res.status === 200) {
      const {token, role}  = res.data
      console.log(res.data)
      // Save the token in localStorage
      localStorage.setItem("x-access-token", token)
      localStorage.setItem("role",role)
      console.log("Token saved:", token);
      console.log("Role save",role)
    }

    return res.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error // Rethrow error to handle it in the component
  }
}




export const register = async (user) => {
  try{
  const res = await axios.post(endpoints.auth.register, user)
    // console.log(res.status)
    // if (res.status === 201) {
    //   const {token, role}  = res.data;
    //   console.log(res.data)
    //   // Save the token in localStorage
    //   localStorage.setItem("x-access-token", token)
    //   localStorage.setItem("role",role)
    //   console.log("Token saved:", token);
    //   console.log("Role save",role)
    // }
  }catch(error){
    console.error('Register failed:', error)
    throw error // Rethrow error to handle it in the component
  }

  return res.data
}