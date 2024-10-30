import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Link, useNavigate } from 'react-router-dom'

import TextField from '../components/hook-form/rhf-textfield'
import useLogin from '../react-query/hooks/useLogin'

import { useSnackbar } from 'notistack'
import { BackButton, PrimaryButton } from '@/shared/components/CustomButton'

const LoginPage = () => {
  const LoginSchema = z.object({
    email: z.string().email('invalid email'),
    password: z.string().min(1, 'password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  })

  const { mutateAsync } = useLogin()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data)
      navigate('/', { replace: true })
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }

  return (
    <div className='w-screen h-screen fixed bg-[url("/login-background.png")] flex justify-center items-center'>
      <form
        className='bg-white rounded w-3/5 px-16 py-12 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full grid grid-cols-3 items-center mb-8'>
          <BackButton containerStyle='items-center' />
          <p className='font-bold text-2xl text-center justify-self-center whitespace-nowrap'>
            Welcome Back!
          </p>
        </div>

        <TextField
          type='email'
          placeholder='Email Address'
          name='email'
          register={register}
          error={errors.email}
        />

        <TextField
          type='password'
          placeholder='Password'
          name='password'
          register={register}
          error={errors.password}
        />

        <div className='flex gap-2'>
          <input type='checkbox' />
          <p>Remember me</p>
          <p className='flex-grow text-end'>Forgot password?</p>
        </div>

        <PrimaryButton type='submit'>Log in</PrimaryButton>

        <div className='flex gap-2'>
          <p>Don&apos;t have an account?</p>
          <Link to='/register' className='text-blue-700'>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
