import { NavLink, useNavigate } from 'react-router-dom'
import { IoEyeOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'

const UserNavbarDropdown = () => {
  const navigate = useNavigate()

  const handleLogoutClicked = async () => {
    const onLogout = () => navigate('/', { replace: true })
    handleLogoutClicked(onLogout)
  }

  return (
    <div className='absolute right-0 mt-36 w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white pb-1'>
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
        onClick={handleLogoutClicked}
      >
        <IoIosLogOut size={30} />
        <div className='text-base px-10'>Logout</div>
      </NavLink>
    </div>
  )
}

export default UserNavbarDropdown
