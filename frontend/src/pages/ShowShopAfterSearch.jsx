import { useState, useEffect, useContext } from 'react'
import DropdownForFilterBar from '../components/DropdownForFilterBar'
import Shopcard from '../components/ShopCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleSearch } from '@/shared/navbar/services/navbar.service'
import { Link } from 'react-router-dom'
import { useBoolean } from 'usehooks-ts'
import { LoadingSpinner } from '@/shared/components/Spinner'
import { SearchContext } from '@/shared/contexts/SearchProvider'

const Aftersearch = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const centerdiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,432px)',
  }

  // Hey ChatGPT, I have all of the useState in the useContext and I want to use that instead, also when a select is selected set the url to there please
  const {
    searchTerm,
    setSearchTerm,
    searchGenre,
    setSearchGenre,
    searchBudget,
    setSearchBudget,
    searchVerify,
    setSearchVerify,
  } = useContext(SearchContext)

  const [searchResults, setSearchResults] = useState([])
  // const [searchTerm, setSearchTerm] = useState('')
  // const [searchGenre, setSearchGenre] = useState('')
  // const [searchBudget, setSearchBudget] = useState('')
  // const [searchVerify, setSearchVerify] = useState('')
  const isLoading = useBoolean(true)

  // Set initial values for search filters based on URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    setSearchTerm(queryParams.get('keyword') || '')
    setSearchGenre(queryParams.get('genre') || '')
    setSearchBudget(queryParams.get('budget') || '')
    setSearchVerify(queryParams.get('verify') || '')
  }, [location.search])

  // Update the URL whenever any of the context values change
  useEffect(() => {
    const urlParams = new URLSearchParams()
    if (searchTerm) urlParams.append('keyword', searchTerm)
    if (searchGenre) urlParams.append('genre', searchGenre)
    if (searchBudget) urlParams.append('budget', searchBudget)
    if (searchVerify) urlParams.append('verify', searchVerify)

    // Construct the URL with updated parameters and navigate to it
    const newUrl = `?${urlParams.toString()}`
    if (newUrl !== location.search) {
      navigate(newUrl, { replace: true })
    }
  }, [
    searchTerm,
    searchGenre,
    searchBudget,
    searchVerify,
    location.search,
    navigate,
  ])

  useEffect(() => {
    // Construct the URL with query parameters using state values
    const url = `/search?keyword=${encodeURIComponent(
      searchTerm
    )}&genre=${encodeURIComponent(searchGenre)}&budget=${encodeURIComponent(
      searchBudget
    )}&verify=${encodeURIComponent(searchVerify)}`

    const onFound = (result) => {
      setSearchResults(result)
      isLoading.setFalse()
    }

    const onNotFound = () => {
      setSearchResults([])
      isLoading.setFalse()
    }

    isLoading.setTrue()
    handleSearch(url, onFound, onNotFound)
  }, [searchTerm, searchGenre, searchBudget, searchVerify])

  // console.log('Location state:', location.state.searchResults);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const term = queryParams.get('keyword')
    setSearchTerm(term || '')
  }, [location.search])

  const VerifiedOption = ['Yes', 'No']
  const GenreOption = [
    'Suits',
    'Wedding',
    'Formal Dress',
    'Police',
    'Cosplay',
    'Others',
  ]

  const bottomShadowStyle = {
    boxShadow: '0 8px 14px rgba(255, 68, 67, 0.15)',
  }

  return (
    <div className='relative'>
      {/* Display search query */}
      <p className='text-4xl font-bold pl-10 pt-8 pb-8'>
        Result for { searchTerm ? `"${searchTerm}"` : 'all shops'} {searchVerify && ' (Verified) '}
        {searchBudget && 'within the budget of ' + searchBudget + ' Baht'}
        {searchGenre && ' and is in ' + searchGenre + ' Genre'}
      </p>

      {/* The filter bar */}
      <div
        style={bottomShadowStyle}
        className='w-[100vw] h-[120px] mb-12 sticky top-[60px] z-10 bg-white'
      >
        <div className='w-[90vw] h-full flex justify-around items-center m-auto'>
          <div className='w-[300px] h-3/5'>
            <p className='text-lg font-medium h-1/2 flex items-center'>
              Shop Verified
            </p>
            <DropdownForFilterBar
              options={VerifiedOption}
              placeHolder='Any'
              defaultValue={searchVerify}
              onChange={setSearchVerify}
            />
          </div>
          <div className='w-[300px] h-3/5'>
            <p className='text-lg font-medium h-1/2 flex items-center'>
              Budget
            </p>
            <input
              className='flex row h-1/2 w-[300px] border-b border-red-300 text-left text-2xl font-bold focus:outline-none'
              type='number'
              min='0'
              max='999999'
              step='1000'
              placeholder='Any'
              value={searchBudget}
              onChange={(e) => setSearchBudget(e.target.value)}
            />
          </div>
          <div className='w-[300px] h-3/5'>
            <p className='text-lg font-medium h-1/2 flex items-center'>Genre</p>
            <DropdownForFilterBar
              options={GenreOption}
              placeHolder='Any'
              defaultValue={searchGenre}
              onChange={setSearchGenre}
            />
          </div>
        </div>
      </div>

      {/* Placing cards  */}
      {/* <div style={centerdiv} className="justify-center w-[90vw] m-auto z-1">
        <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
        shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
        shopName="Hinoshii is cool"
        shopRating="5.0"
        reviewCount="1384"
        shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        startBudget="2100"
        stopBudget="999999"/>

        <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
        shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
        shopName="Read this is gay"
        shopRating="5.0"
        reviewCount="1384"
        shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        startBudget="2100"
        stopBudget="999999"/>
      </div> */}

      <div
        style={centerdiv}
        className='flex justify-center w-full px-10 m-auto z-1'
      >
        {isLoading.value ? (
          <LoadingSpinner className='w-48 h-48 ml-auto mr-auto mt-24' />
        ) : searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index}>
              <Link
                to={`/viewshop/${result._id}`}
                state={{ shopId: result._id }}
              >
                <Shopcard
                  previewImage={result.previewImage}
                  shopProfile={result.imageProfile}
                  shopName={result.shopName}
                  shopRating={result.shopRating}
                  reviewCount={result.reviewCount}
                  shopDescription={result.shopDescription}
                  startBudget={result.orderTypeIds[0]}
                  stopBudget={result.stopBudget}
                  genre={result.genre}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className='items-center'>
            <p className='text-5xl mx-11 items-center font-bold'>
              No shop found
            </p>
            <div className='bg-gray-300 p-1 mt-2'>
              <img
                src='https://smartlandapartments.com/media/articles/CLE-3-Blog-8.jpg'
                alt=''
                className='w-full h-[300px]'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Aftersearch
