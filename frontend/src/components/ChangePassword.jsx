import React from 'react'
import ChangePasswordInput from './ChangePasswordInput';
const ChangePassword = () => {

    return (
    <div className="px-5 lg:px-20">
        <div className="text-3xl font-semibold mb-4">Change Password</div>
        <div className='pt-5'>
            <ChangePasswordInput placeholder="Old Password" name="old password"/>
           
            <p className='text-xs py-3'>New Password (must be 8-16 characters)</p>

            <ChangePasswordInput placeholder="New Password" name="new password"/>

            <div className='py-3'>
                <ChangePasswordInput placeholder="Confirm New Password" name="conferm password"/>
            </div>
            <div className='ml-20 pt-3'>
                <button 
                    className="w-auto bg-red-500 hover:bg-white hover:text-red-500 text-white border py-2 rounded"
                >
                    <p className='px-11'>Confirm</p>  
                </button>
            </div>
        </div>

    </div>
  )
}

export default ChangePassword
