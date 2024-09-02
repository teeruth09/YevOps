import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'

import TextField from '../components/hook-form/rhf-textfield'

const LoginPage = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    console.log(`data = ${JSON.stringify(data)}`)
  }

  return (
    <div className='w-screen h-screen fixed bg-[url("/login-background.png")] flex justify-center items-center'>
      <form
        className='bg-white rounded w-3/5 px-16 py-12 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className='mb-8 font-bold text-2xl'>Welcome Back!</p>

        <TextField
          type='email'
          placeholder='Email Address'
          name='email'
          register={register}
        />

        <TextField
          type='password'
          placeholder='Password'
          name='password'
          register={register}
        />

        <div className='flex gap-2'>
          <input type='checkbox' />
          <p>Remember me</p>
          <p className='flex-grow text-end'>Forgot password?</p>
        </div>

        <button
          type='submit'
          className='mt-4 bg-red-500 py-4 rounded-lg font-bold'
        >
          LOG IN
        </button>

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
