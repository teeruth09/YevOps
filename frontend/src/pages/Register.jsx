import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import TextField from '../components/hook-form/rhf-textfield'

const RegisterPage = () => {
  const RegisterSchema = z
    .object({
      firstname: z.string().min(1, { message: 'Firstname is required' }),
      lastname: z.string().min(1, { message: 'Lastname is required' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
      confirmPassword: z.string().min(8, {
        message: 'Confirm Password must be at least 8 characters long',
      }),
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
      userType: z.string().min(1, { message: 'User type is required' }),
      username: z.string().min(1, { message: 'Username is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'], // path of error
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data) => {
    console.log(`data = ${JSON.stringify(data)}`)
  }

  return (
    <div className='w-screen h-screen fixed bg-[url("/login-background.png")] flex justify-center items-center'>
      <form
        className='bg-white rounded w-3/5 px-16 py-12 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className='mb-8 font-bold text-2xl text-center'>Create an Account</p>

        <div className='w-full flex gap-2'>
          <TextField
            placeholder='Firstname'
            name='firstname'
            className='w-1/2'
            register={register}
            error={errors.firstname}
          />
          <TextField
            placeholder='Lastname'
            name='lastname'
            className='w-1/2'
            register={register}
            error={errors.lastname}
          />
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

        <div className='w-full grid grid-cols-5 gap-2'>
          <select
            className='col-span-2 border rounded px-4 py-2'
            defaultValue=''
          >
            <option value='' disabled>
              Gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>

          <select className='border rounded px-4 py-2' defaultValue='Date'>
            <option value='Date' disabled>
              Date
            </option>
            {/* Replace with dynamic date options */}
          </select>

          <select className='border rounded px-4 py-2' defaultValue=''>
            <option value='' disabled>
              Month
            </option>
            {/* Replace with dynamic month options */}
          </select>

          <select className='border rounded px-4 py-2' defaultValue=''>
            <option value='' disabled>
              Year
            </option>
            {/* Replace with dynamic year options */}
          </select>
        </div>

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

        <div className='w-full flex items-center gap-2'>
          <p className='w-1/3'>Create As : </p>
          <TextField
            placeholder='User'
            name='userType'
            register={register}
            error={errors.userType}
          />
        </div>

        <div className='w-full flex items-center gap-2'>
          <p className='w-1/3'>Name : </p>
          <TextField
            placeholder='Username'
            name='username'
            register={register}
            error={errors.username}
          />
        </div>

        <button className='mt-4 bg-red-500 py-4 rounded-lg font-bold'>
          REGISTER
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
