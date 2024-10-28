import { useState, useEffect } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { fetchUserData, handleLogout } from './services/navbar.service'
import { clientSideLinks, shopSideLinks } from './links.constant'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { FaAngleRight } from 'react-icons/fa6'

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isClient = true }) => {
  const [userInfo, setUserInfo] = useState({
    username: 'Loading...',
  })
  const location = useLocation()

  // get user data on load
  useEffect(() => {
    const onSuccess = (data) => {
      setUserInfo({
        ...userInfo,
        username: data.username,
      })
    }
    fetchUserData(onSuccess)
    // NOTE: useEffect update on dependency change
    // when you put userInfo in the dependency it setUserInfo when userInfo change which make userInfo change again
    // putting userInfo here cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='fixed w-32 md:w-[240px] lg:w-[300px] pt-8 ps-8 flex-shrink-0 min-h-screen bg-white shadow-lg p-5 z-10'>
      <h2 className='text-xl mb-6 font-bold line-clamp-1'>{userInfo.username}</h2>
      <hr className='border-t border-gray-300' />
      <div className='space-y-10'>
        {/* Links list */}
        {isClient
          ? clientSideLinks.map((link) => (
              <NavLink to={link.link} key={link.link}>
                <div className='flex relative justify-center md:justify-normal items-center space-x-3 py-4'>
                  {location.pathname === link.link && <FaAngleRight className='absolute left-0 md:relative' />}

                  {link.icon}
                  <span
                    className={cn(
                      'text-gray-700 hidden md:inline',
                      location.pathname === link.link && 'font-bold'
                    )}
                  >
                    {link.name}
                  </span>
                </div>
              </NavLink>
            ))
          : shopSideLinks.map((link) => (
              <NavLink to={link.link} key={link.link}>
                <div className='flex items-center space-x-3 py-4'>
                  {location.pathname === link.link && <FaAngleRight />}

                  {link.icon}

                  <span
                    className={cn(
                      'text-gray-700',
                      location.pathname === link.link && 'font-bold'
                    )}
                  >
                    {link.name}
                  </span>
                </div>
              </NavLink>
            ))}

        {/* Log out */}
        <hr className='border-t border-gray-300' />
        <NavLink to='/' onClick={handleLogout}>
          <div className='flex items-center space-x-3 py-4 justify-center md:justify-normal'>
            <FaSignOutAlt className='text-red-600' size={20} />
            <span className='text-red-600 hidden md:inline'>Log Out</span>
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
