const RegisterPage = () => {
  return (
    <div className='w-screen h-screen fixed bg-[url("/login-background.png")] flex justify-center items-center'>
      <div className='bg-white rounded w-3/5 px-16 py-12 flex flex-col gap-4'>
        <p className='mb-8 font-bold text-2xl text-center'>Create an Account</p>

        <div className='w-full flex gap-2'>
          <input
            placeholder='Firstname'
            className='w-1/2 border rounded px-4 py-2'
          />
          <input
            placeholder='Lastname'
            className='w-1/2 border rounded px-4 py-2'
          />
        </div>

        <input
          placeholder='Email Address'
          className='border rounded px-4 py-2'
        />

        <div className='w-full flex gap-2'>
          <input
            placeholder='Password'
            className='w-1/2 border rounded px-4 py-2'
          />
          <input
            placeholder='Confirm Password'
            className='w-1/2 border rounded px-4 py-2'
          />
        </div>

        <div className='w-full grid grid-cols-5 gap-2'>
          <select className='col-span-2 border rounded px-4 py-2'>
            <option disabled selected>
              Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select className='border rounded px-4 py-2'>
            <option disabled selected>
              Date
            </option>
          </select>
          <select className='border rounded px-4 py-2'>
            <option disabled selected>
              Month
            </option>
          </select>
          <select className='border rounded px-4 py-2'>
            <option disabled selected>
              Year
            </option>
          </select>
        </div>

        <div className='w-full flex gap-2'>
          <input
            placeholder='ID Card Number'
            className='w-1/2 border rounded px-4 py-2'
          />
          <input
            placeholder='Phone'
            className='w-1/2 border rounded px-4 py-2'
          />
        </div>

        <textarea placeholder='Address' className='border rounded px-4 py-2' />

        <div className='w-full flex items-center gap-2'>
          <p className='w-1/3'>Create As : </p>
          <input
            placeholder='User'
            className='w-full border rounded px-4 py-2'
          />
        </div>

        <div className='w-full flex items-center gap-2'>
          <p className='w-1/3'>Name : </p>
          <input
            placeholder='Username'
            className='w-full border rounded px-4 py-2'
          />
        </div>

        <button className='mt-4 bg-red-500 py-4 rounded-lg font-bold'>
          REGISTER
        </button>
      </div>
    </div>
  )
}

export default RegisterPage
