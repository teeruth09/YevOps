import React from 'react'

const ChangePassword = () => {
  return (
    <div className="px-5 lg:px-20">
        <div className="text-2xl py-3">Change Password</div>
        <div className='pt-5'>
            <input
                name="oldpassword"
                type="text"
                value=""
                placeholder='Old Password'
                className='border border-gray-300 rounded-md h-10 w-auto px-5 mb-4 lg:mb-0'

            />
            <p className='text-xs py-3'>New Password (must be 8-16 characters)</p>

            <input
                name="newpassword"
                type="text"
                value=""
                placeholder='New Password'
                className='border border-gray-300 rounded-md h-10 w-auto px-5 mb-4 lg:mb-0'

            />
            <div className='py-3'>

            <input
                name="confirmpassword"
                type="text"
                value=""
                placeholder='Confirm New Password'
                className='border border-gray-300 rounded-md h-10 w-auto px-5 mb-4 lg:mb-0'

            />
            </div>
            
      
        </div>

    </div>
  )
}

export default ChangePassword
