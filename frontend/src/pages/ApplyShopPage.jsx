import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios, { endpoints } from '../util/axios'

import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import TextField from '../components/hook-form/rhf-textfield'
import SelectRow from '@/components/register/SelectRow'

const ApplyShopPage = () => {
  const navigate = useNavigate()

  const RegisterSchema = z
    .object({
      firstname: z.string().min(1, { message: 'Firstname is required' }),
      lastname: z.string().min(1, { message: 'Lastname is required' }),
      email: z.string().email({ message: 'Invalid email address' }),
      // TODO: make regex for password
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
      confirmPassword: z.string().min(8, {
        message: 'Confirm Password must be at least 8 characters long',
      }),
      gender: z.string().min(1, { message: 'Gender is required' }),
      idCardNumber: z
        .string()
        .length(13, { message: 'ID Card Number must be 13 characters' })
        .refine(
          (cardNumber) => /^[0-9]\d*$/.test(cardNumber),
          'ID Card Number must be numbers'
        ),
      phone: z
        .string()
        .min(9, { message: 'Phone number must be at least 9 digits' })
        .max(10, { message: 'Phone number must be at most 10 digits' })
        .refine((phone) => /^0\d{8,9}$/.test(phone), 'Invalid phone number'),
      address: z.string().min(1, { message: 'Address is required' }),
      username: z.string().min(1, { message: 'Shop name is required' }),
      date: z.string().min(1, { message: 'Date is required' }),
      month: z.string().min(1, { message: 'Month is required' }),
      year: z.string().min(1, { message: 'Year is required' }),
      role: z.string().default('shop'),
      shopDescription: z.string().default(''),
      location: z.string().default(''),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'], // path of error
    })
    // Create birthdate after validation of other fields
    .refine(
      (data) => {
        const isValidDate = !isNaN(
          new Date(`${data.year}-${data.month}-${data.date}`).getTime()
        )
        return isValidDate
      },
      {
        message: 'Invalid birthdate',
        path: ['date'], // where you want the error to show
      }
    )
    .transform((data) => ({
      ...data,
      birthdate: `${data.year}-${data.month}-${data.date}`, // Concatenate to create birthdate
    }))

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  })

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(endpoints.auth.applyShop, data)

      if (response.status === 201) {
        const { token, role } = response.data
        // Save the token in localStorage
        localStorage.setItem('x-access-token', token)
        localStorage.setItem('role', role)
        console.log('Token saved:', token)
        console.log('Role save', role)
      }

      navigate('/')
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
        <p className='mb-8 font-bold text-2xl text-center'>Open your shop</p>

        <div className='w-full flex items-center gap-2'>
          <TextField
            placeholder='Shop name'
            name='username'
            register={register}
            error={errors.username}
          />
        </div>

        <div className='w-full flex gap-2'>
          <div className='w-1/2 flex flex-col gap-2'>
            <TextField
              placeholder='Firstname'
              name='firstname'
              register={register}
              error={errors.firstname}
            />
          </div>

          <div className='w-1/2 flex flex-col gap-2'>
            <TextField
              placeholder='Lastname'
              name='lastname'
              register={register}
              error={errors.lastname}
            />
          </div>
        </div>

        <TextField
          type='email'
          placeholder='Email Address'
          name='email'
          register={register}
          error={errors.email}
        />

        <div className='w-full flex gap-2'>
          <div className='w-1/2 flex flex-col gap-2'>
            <TextField
              placeholder='Password'
              type='password'
              name='password'
              register={register}
              error={errors.password}
            />
          </div>

          <div className='w-1/2 flex flex-col gap-2'>
            <TextField
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              register={register}
              error={errors.confirmPassword}
            />
          </div>
        </div>

        <SelectRow setValue={setValue} />

        <div className='w-full flex gap-2'>
          <div className='w-1/2 flex flex-col gap-2'>
            <TextField
              placeholder='ID Card Number'
              name='idCardNumber'
              register={register}
              error={errors.idCardNumber}
            />
          </div>

          <div className='w-1/2 flex flex-col gap-2'>
            <TextField
              placeholder='Phone'
              name='phone'
              register={register}
              error={errors.phone}
            />
          </div>
        </div>

        <div className='w-full'>
          <textarea
            placeholder='Address'
            className='w-full border rounded px-4 py-2'
            {...register('address')}
          />
          {errors.address && (
            <p className='text-red-400 text-sm mt-1'>
              * {errors.address.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='mt-4 bg-red-500 py-4 rounded-lg font-bold'
        >
          REGISTER
        </button>
      </form>
    </div>
  )
}

export default ApplyShopPage
