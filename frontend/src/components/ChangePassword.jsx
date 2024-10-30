import ChangePasswordInput from './ChangePasswordInput'

const ChangePassword = () => {
  return (
    <div className='px-5 w-full'>
      <p className='pt-3 text-3xl font-semibold mb-8'>Change Password</p>
      <div className='pt-5'>
        <ChangePasswordInput placeholder='Old Password' name='old password' />

        <p className='text-xs py-3'>New Password (must be 8-16 characters)</p>

        <ChangePasswordInput placeholder='New Password' name='new password' />

        <div className='py-3'>
          <ChangePasswordInput
            placeholder='Confirm New Password'
            name='conferm password'
          />
        </div>

        <button className='px-11 mt-3 bg-red-500 hover:bg-white hover:text-red-500 text-white border py-2 rounded'>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
