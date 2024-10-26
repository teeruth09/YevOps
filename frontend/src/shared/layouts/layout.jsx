import Navbar from '@/shared/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
