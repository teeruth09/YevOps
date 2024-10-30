import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { RxSlash } from 'react-icons/rx'
import DropdownForGenre from './DropdownForGenre'

const GenreOption = [
  'Suits',
  'Wedding',
  'Formal Dress',
  'Police',
  'Cosplay',
  'Others',
]

import { Map, Marker } from '@vis.gl/react-google-maps'
import { MAP_API } from '@/global-config'

const ShopEditProfile = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // shop profile image
  const [newAvatarUrl, setNewAvatarUrl] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const hiddenImageInputRef = useRef(null)
  const [selectedGenre, setSelectedGenre] = useState('') // State to store selected genre

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre ? genre.toString() : '') // Ensure genre is a string
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()

      reader.onload = () => {
        setNewAvatarUrl(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('x-access-token')

      try {
        const response = await fetch('http://localhost:5555/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        })

        const data = await response.json()
        setUserInfo({
          //   ...userInfo,
          username: data.username,
          shopName: data.shopName,
          phone: data.phone,
          address: data.address,
          shopDescription: data.shopDescription,
          location: data.location,
          genre: data.genre,
        })
        console.log(data.imageProfile)

        // setNewAvatarUrl(`http://localhost:5555/images/${data.imageProfile}`)
        setNewAvatarUrl(data.imageProfile)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const updateUserInfo = async () => {
    const token = localStorage.getItem('x-access-token')
    const formData = new FormData()

    if (avatarFile) formData.append('image', avatarFile)

    // Append userInfo properties to formData
    Object.entries(userInfo).forEach(([key, value]) => {
      formData.append(key, value)
    })

    //send genre
    // if(selectedGenre !== '')
    // {
    //   formData.append('genre', selectedGenre.toString());
    // }
    if (selectedGenre) {
      formData.append('genre', selectedGenre)
    }
    console.log('SelectGenre', selectedGenre)
    // send formData instead with userInfo too
    try {
      const response = await fetch('http://localhost:5555/profile', {
        method: 'PUT',
        headers: {
          'x-access-token': token, // No need to set 'Content-Type' header, fetch will handle it when using FormData
        },
        body: formData, // Use formData as the body
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Updated user info:', data)
      } else {
        console.error('Failed to update user info:', data)
      }
    } catch (error) {
      console.error('Error updating user info:', error)
    }
  }

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    // Optionally, you can reset the changes here if needed
  }
  const handleSaveClick = () => {
    //update profile
    if (isEditing) {
      updateUserInfo()
      setIsEditing(false) // Disable editing mode after saving
    }
  }

  return (
    <div className='px-5 h-full min-w-full'>
      <div className='py-3 text-3xl font-semibold mb-4'>Profile</div>
      <div className='w-full lg:w-auto h-full bg-white shadow-xl p-5 lg:p-10'>
        <div className='Profiledetail'>
          <div className='flex flex-col lg:flex-row'>
            <div
              className={cn(
                'w-32 h-32 lg:w-48 lg:h-48 bg-gray-300',
                isLoading && 'animate-pulse'
              )}
            >
              <img
                src={newAvatarUrl ?? userInfo?.imageProfile}
                alt='profile.jpg'
                className={cn(
                  'w-32 h-32 lg:w-48 lg:h-48',
                  isEditing && 'cursor-pointer'
                )}
                // when this img is clicked, the input below is clicked instead
                onClick={() => hiddenImageInputRef.current?.click()}
              />
            </div>

            <input
              required
              ref={hiddenImageInputRef}
              id='avatar'
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              disabled={!isEditing}
              className='hidden'
            />

            <div className='pt-5 lg:pt-0 lg:pl-5'>
              <div className='text-2xl font-bold'>{userInfo?.username}</div>
              <div className='flex flex-col lg:flex-row'>
                <div className='name'>
                  <p>Shop Name</p>
                  <input
                    name='shopName'
                    type='text'
                    value={userInfo?.shopName}
                    className='border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0'
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className='flex flex-col lg:flex-row pt-3'>
                <div className='mb-4 lg:mb-0'>
                  <p>Phone Number</p>
                  <input
                    name='phone'
                    type='text'
                    value={userInfo?.phone}
                    className='border border-gray-300 rounded-xl h-10 px-5'
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='pt-6'>
            <p>Home No, Room No, Apartment/Village Name, Sub-District </p>
            <input
              name='address'
              type='text'
              value={userInfo?.address}
              className='border border-gray-300 rounded-xl h-10 w-full px-5'
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className='pt-4'>
            <p>Shop Description</p>

            <textarea
              name='shopDescription'
              value={userInfo?.shopDescription}
              className='border border-gray-300 rounded-xl h-20 w-full pb-9 px-2 '
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className='pt-4'>
            {!isEditing ? (
              <div>
                <p>Shop Location</p>
                {MAP_API && (
                  <div className='h-[320px] w-full'>
                    <Map
                      defaultZoom={9}
                      defaultCenter={{ lat: 13, lng: 100 }}
                      disableDefaultUI
                    >
                      <Marker position={{ lat: 13, lng: 100 }} />
                    </Map>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className='flex items-center'>
                  <p>Shop Location</p>
                  <FiPlusCircle size={25} className='px-1' />
                  <RxSlash />
                  <div className='items-center mt-1 px-1'>
                    <input
                      id='default-checkbox'
                      type='checkbox'
                      value=''
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                  </div>
                  <p>Use same location as address</p>
                </div>

                <img
                  src={userInfo?.location}
                  alt='location.jpg'
                  className='w-full h-full'
                />
              </div>
            )}
          </div>
          <div className='my-10'>
            <h1>Genre</h1>
            <DropdownForGenre
              options={GenreOption}
              placeHolder={userInfo?.genre}
              isEditting={isEditing}
              onSelectOption={handleGenreSelect}
            />
            {/* <p>Selected Genre: {selectedGenre}</p>  */}
          </div>

          <div className='flex flex-col lg:flex-row pt-10 items-center'>
            <div className='flex-1'></div>
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className='w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded'
              >
                Edit
              </button>
            ) : (
              <div>
                <button
                  onClick={handleCancelClick}
                  className='w-full lg:w-40 bg-white hover:bg-gray-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-2 lg:mt-0 lg:ml-2'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  className='ml-3 w-full lg:w-40 bg-red-500 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded'
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopEditProfile
