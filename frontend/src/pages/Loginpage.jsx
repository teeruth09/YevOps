import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Link, useNavigate } from 'react-router-dom'

import TextField from '../components/hook-form/rhf-textfield'
import useLogin from '../react-query/hooks/useLogin'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'

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

  const [error, setError] = useState('')

  // error message dialog
  const dialog = useBoolean()

  const onSubmit = async (data) => {
    console.log(`data = ${JSON.stringify(data)}`)

    try {
      await mutateAsync(data)
      console.log('Login successful, token stored in localStorage')
      navigate('/', { replace: true })
    } catch (error) {
      setError(error)
      // why didn't this open the dialog?
      dialog.setTrue()
    }
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

      <Dialog
        open={dialog.value}
        onClose={dialog.setFalse} // Close the dialog when clicking outside or pressing ESC
      >
        <DialogTitle id='alert-dialog-title'>Login Error</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <DialogContentText id='alert-dialog-description'>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pt: 1, pb: 2, px: 3 }}>
          <button onClick={dialog.setFalse} autoFocus>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LoginPage
