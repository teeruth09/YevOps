import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchGenre, setSearchGenre] = useState('')
  const [searchBudget, setSearchBudget] = useState('')
  const [searchVerify, setSearchVerify] = useState('')
  const navigate = useNavigate()

  // Function to handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    try {
      // Sending the search term to the backend API
      const response = await fetch(
        `http://localhost:5555/search?keyword=${searchTerm}&genre=${searchGenre}&budget=${searchBudget}&verify=${searchVerify}`,
        {
          method: 'GET', // Change to 'POST' if your API expects a POST request
        }
      )

      if (!response.ok) {
        if (response.status === 404) {
          // Handle 404 error, navigate to a different endpoint or show a message
          console.error('Resource not found (404)')
          navigate(`/search?keyword=${searchTerm}&genre=${searchGenre}&budget=${searchBudget}&verify=${searchVerify}`) // Example: Navigate to a custom error page
          return
        } else {
          throw new Error('Search request failed')
        }
      }

      const result = await response.json()
      console.log('Search result:', result)
      console.log({ searchResults: result }) // Log the state being passed
      navigate(`/search?keyword=${searchTerm}`, {
        state: { searchResults: result },
      })

      // Do something with the result, like updating state or redirecting
      // Example: setSearchResults(result);
    } catch (error) {
      console.error('Error during search:', error)
    }
  }

  return (
    <nav className='bg-red-800 sticky top-0 z-10'>
      <div className='mx-1 w-full px-2 sm:px-6 lg:px-8 '>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='font-medium text-2xl text-white'>YevOps</div>
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
          <div className='flex flex-1 items-center  sm:items-stretch sm:justify-start ml-4 '>
            <div className='hidden sm:ml-6 sm:block'>
              <div className=' space-x-4'>
                <NavLink
                  exact
                  to='/'
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md bg-white px-5 py-2 text-sm font-medium text-black'
                      : 'rounded-md px-5 py-2 text-sm font-medium text-white hover:text-black'
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to='/about'
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md bg-white px-5 py-2 text-sm font-medium text-black'
                      : 'rounded-md px-5 py-2 text-sm font-medium text-white hover:text-black'
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to='/applyshop'
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md bg-white px-5 py-2 text-sm font-medium text-black'
                      : 'rounded-md px-5 py-2 text-sm font-medium text-white hover:text-black'
                  }
                >
                  ApplyShop
                </NavLink>
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className=' space-x-7'>
              <NavLink
                to='/login'
                className='rounded-md px-3 py-2 text-sm font-medium text-white  hover:text-black '
              >
                Login
              </NavLink>
              <NavLink
                to='/register'
                className='rounded-md px-3 py-2 text-sm font-medium text-white  hover:text-black'
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
