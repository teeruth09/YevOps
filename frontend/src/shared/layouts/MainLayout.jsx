import Navbar from '@/shared/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* spaces for fixed Navbar */}
      <div className='mt-16'/>
      <Outlet />
    </>
  )
}

export default MainLayout
