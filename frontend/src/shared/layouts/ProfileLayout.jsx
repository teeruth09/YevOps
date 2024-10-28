import { Outlet } from 'react-router-dom'
import Sidebar from '../navbar/Sidebar'

const ProfileLayout = () => {
  const role = localStorage.getItem('role')

  return (
    <div className='flex min-h-screen w-full'>
      <Sidebar isClient={role === 'client'} />

      <div className='mr-[300px]' />
      <div className='flex-grow flex justify-center h-full px-10 py-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout
