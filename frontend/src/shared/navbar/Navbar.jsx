import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import UserNavbarDropdown from './UserNavbarDropdown'
import { fetchUserData, handleSearch } from './services/navbar.service'
import { jwtDecode } from 'jwt-decode'
import { clientLinks, guestLinks, shopLinks } from './links.constant'

const Navbar = () => {
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const [userInfo, setUserInfo] = useState({
    username: 'Loading...',
  })

  useEffect(() => {
    const onSuccess = (data) => {
      setUserInfo({
        ...userInfo,
        username: data.username,
      })
    }
    fetchUserData(onSuccess)
  }, [userInfo])

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  let token = localStorage.getItem('x-access-token')
  let role = localStorage.getItem('role')

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000

      if (decoded.exp < currentTime) {
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [token])

  return (
    <nav className='bg-red-800 sticky top-0 z-50'>
      <div className='mx-1 w-full px-2 sm:px-6 lg:px-8 '>
        <div className='relative flex h-16 items-center justify-between'>
          {/* Logo */}
          <div
            className='font-medium text-2xl text-white cursor-pointer'
            onClick={() => navigate('/')}
          >
            YevOps
          </div>

          {role === 'client' && <SearchInput />}

          <div className='flex flex-1 items-center sm:items-stretch sm:justify-start ml-4'>
            <div className='hidden sm:ml-6 sm:block'>
              <div className=' space-x-4'>
                <NavLinkList isAuthenticated={isAuthenticated} role={role} />
              </div>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <div className=' space-x-7'>
                <NavLink
                  to='/login'
                  className='rounded-md px-3 py-2 text-sm font-medium text-white  hover:font-bold '
                >
                  Login
                </NavLink>
                <NavLink
                  to='/register'
                  className='rounded-md px-3 py-2 text-sm font-medium text-white  hover:font-bold'
                >
                  Register
                </NavLink>
              </div>
            </div>
          ) : (
            <div
              className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 cursor-pointer'
              onClick={toggleDropdown}
            >
              <div className='flex items-center space-x-7'>
                <div className='font-medium  text-white'>
                  {userInfo.username}
                </div>
                <FaUserCircle size={50} />

                {isDropdownOpen && <UserNavbarDropdown />}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

// --------------------------------------------------

// eslint-disable-next-line react/prop-types
const NavLinkList = ({ isAuthenticated, role }) => {
  if (isAuthenticated) {
    if (role === 'client') {
      return (
        <>
          {clientLinks.map((link) => (
            <CustomNavLink key={link.link} to={link.link} title={link.name} />
          ))}
        </>
      )
    } else if (role === 'shop') {
      return (
        <>
          {shopLinks.map((link) => (
            <CustomNavLink key={link.link} to={link.link} title={link.name} />
          ))}
        </>
      )
    }
  }

  return (
    <>
      {guestLinks.map((link) => (
        <CustomNavLink key={link.link} to={link.link} title={link.name} />
      ))}
    </>
  )
}

// eslint-disable-next-line react/prop-types
const CustomNavLink = ({ to, title }) => {
  return (
    <NavLink
      exact
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'rounded-md bg-white px-5 py-2 text-sm font-bold'
          : 'rounded-md px-5 py-2 text-sm font-medium text-white hover:font-bold'
      }
    >
      {title}
    </NavLink>
  )
}

// --------------------------------------------------

const SearchInput = () => {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  // Function to handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    const onNotFound = () => navigate(`/search?keyword=${searchTerm}`)
    const onFound = (result) =>
      navigate(`/search?keyword=${searchTerm}`, {
        state: { searchResults: result },
      })

    handleSearch(searchTerm, onFound, onNotFound)
  }

  return (
    <div className='relative pl-8 text-gray-600 '>
      <form
        className='bg-white flex  rounded-xl h-10 px-5 pr-5 '
        onSubmit={handleSearchSubmit}
      >
        <input
          type='search'
          name='search'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='text-sm focus:outline-none pr-5'
        />
        <button
          type='submit'
          className='flex items-center whitespace-nowrap  py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </button>
      </form>
    </div>
  )
}