import { endpoints } from '@/shared/endpoints'

export const handleLogout = async (onLogout = null) => {
  const token = localStorage.getItem('x-access-token')
  try {
    const response = await fetch(endpoints.auth.logout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })

    if (response.ok) {
      localStorage.removeItem('x-access-token') // Clear token from localStorage
      console.log('Logout successful')
      if (onLogout) onLogout()
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

// Function to handle search submission
export const handleSearch = async (searchTerm, onFound, onNotFound) => {
  try {
    // Sending the search term to the backend API
    const response = await fetch(endpoints.client.search(searchTerm))

    if (!response.ok) {
      if (response.status === 404) {
        // Handle 404 error, navigate to a different endpoint or show a message
        console.error('Resource not found (404)')
        onNotFound()
        return
      } else {
        throw new Error('Search request failed')
      }
    }

    const result = await response.json()
    console.log('Search result:', result)
    console.log({ searchResults: result }) // Log the state being passed
    onFound(result)

    // Do something with the result, like updating state or redirecting
    // Example: setSearchResults(result);
  } catch (error) {
    console.error('Error during search:', error)
  }
}

export const fetchUserData = async (onSuccess) => {
  const token = localStorage.getItem('x-access-token')

  try {
    const response = await fetch(endpoints.user.profile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }) // Replace with your API endpoint
    const data = await response.json()
    onSuccess(data)
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}
