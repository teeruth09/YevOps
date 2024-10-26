import { NavLink, useNavigate } from 'react-router-dom'
import { IoEyeOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'

const UserNavbarDropdown = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const token = localStorage.getItem('x-access-token')
    try {
      const response = await fetch('http://localhost:5555/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      })

      if (response.ok) {
        localStorage.removeItem('x-access-token') // Clear token from localStorage
        console.log('Logout successfull')
        navigate('/', { replace: true })
        // Force reload if on the home page
        if (window.location.pathname === '/') {
          window.location.reload()
        }
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className='absolute right-0 mt-36 w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white'>
      <div className='py-1'>
        <NavLink
          to='/client/profile'
          className='px-4 py-2 text-sm text-gray-700 flex items-center bg-white'
        >
          <IoEyeOutline size={30} />
          <div className='text-base px-10'>Profile</div>
        </NavLink>
        <NavLink
          to='/'
          className='px-4 py-2 text-sm text-gray-700 flex items-center bg-white'
          onClick={handleLogout}
        >
          <IoIosLogOut size={30} />
          <div className='text-base px-10'>Logout</div>
        </NavLink>
      </div>
    </div>
  )
}

export default UserNavbarDropdown
