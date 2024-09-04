import { useMutation } from '@tanstack/react-query'
import { login } from '../services/auth-service'

const useLogin = () => {
  return useMutation({
    mutationFn: (credential) => login(credential),
  })
}

export default useLogin
