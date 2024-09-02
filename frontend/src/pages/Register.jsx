import { useForm } from 'react-hook-form'
import TextField from '../components/hook-form/rhf-textfield'

const RegisterPage = () => {
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
        <p className='mb-8 font-bold text-2xl text-center'>Create an Account</p>

        <div className='w-full flex gap-2'>
          <TextField
            placeholder='Firstname'
            name='firstName'
            className='w-1/2'
            register={register}
          />
          <TextField
            placeholder='Lastname'
            name='lastName'
            className='w-1/2'
            register={register}
          />
        </div>

        <TextField
          type='email'
          placeholder='Email Address'
          name='email'
          register={register}
        />

        <div className='w-full flex gap-2'>
          <TextField
            placeholder='Password'
            type='password'
            name='password'
            className='w-1/2'
            register={register}
          />
          <TextField
            placeholder='Confirm Password'
            type='password'
            name='confirmPassword'
            className='w-1/2'
            register={register}
          />
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
          <TextField
            placeholder='ID Card Number'
            name='idCardNumber'
            className='w-1/2'
            register={register}
          />
          <TextField
            placeholder='Phone'
            name='phone'
            className='w-1/2'
            register={register}
          />
        </div>

        <textarea placeholder='Address' className='border rounded px-4 py-2' />

        <div className='w-full flex items-center gap-2'>
          <p className='w-1/3'>Create As : </p>
          <TextField placeholder='User' name='userType' register={register} />
        </div>

        <div className='w-full flex items-center gap-2'>
          <p className='w-1/3'>Name : </p>
          <TextField
            placeholder='Username'
            name='username'
            register={register}
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
