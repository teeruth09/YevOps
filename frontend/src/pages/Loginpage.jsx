const LoginPage = () => {
    return (
      <div className='w-screen h-screen fixed bg-[url("/login-background.png")] flex justify-center items-center'>
        <div className='bg-white rounded w-3/5 px-16 py-12 flex flex-col gap-4'>
          <p className='mb-8 font-bold text-2xl'>Welcome Back!</p>
  
          <input
            placeholder='Email Address'
            className='border rounded px-4 py-2'
          />
          <input placeholder='Password' className='border rounded px-4 py-2' />
  
          <div className='flex gap-2'>
            <input type='checkbox' />
            <p>Remember me</p>
            <p className='flex-grow text-end'>Forgot password?</p>
          </div>
  
          <button className='mt-4 bg-red-500 py-4 rounded-lg font-bold'>
            LOG IN
          </button>
  
          <div className='flex gap-2'>
            <p>Don&apos;t have an account?</p>
            <p className='text-blue-700'>Sign up</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default LoginPage
  