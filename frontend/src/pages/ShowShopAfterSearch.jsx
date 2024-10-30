import { useState, useEffect } from 'react'
import DropdownForFilterBar from '../components/DropdownForFilterBar'
import Shopcard from '../components/ShopCard'
import { useLocation } from 'react-router-dom'
import { handleSearch } from '@/shared/navbar/services/navbar.service'
import { Link } from 'react-router-dom'
import { useBoolean } from 'usehooks-ts'
import { LoadingSpinner } from '@/shared/components/Spinner'

const Aftersearch = () => {
  const location = useLocation()

  const centerdiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,432px)',
  }

  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchGenre, setSearchGenre] = useState('')
  const [searchBudget, setSearchBudget] = useState('')
  const [searchVerify, setSearchVerify] = useState('')
  const [budget, setBudget] = useState('')
  const isLoading = useBoolean(true)
  // Hey ChatGPT Make a loading before the loading is finished
  // use <LoadingSpinner /> for loading

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const term = queryParams.get('keyword')
    const genre = queryParams.get('genre')
    const budget = queryParams.get('budget')
    const verify = queryParams.get('verify')

    setSearchTerm(term || '')
    setSearchGenre(genre || '')
    setSearchBudget(budget || '')
    setSearchVerify(verify || '')

    // Here you would typically fetch search results based on these params.
    // Example: fetchResults(term, genre, budget, verify).then(setSearchResults);
    // Construct the URL with query parameters
    const url = `/search?keyword=${encodeURIComponent(
      term
    )}&genre=${encodeURIComponent(genre)}&budget=${encodeURIComponent(
      budget
    )}&verify=${encodeURIComponent(verify)}`

    // Call your handleSearch function with the constructed URL
    const onFound = (result) => {
      // Handle what happens when results are found
      setSearchResults(result)
      isLoading.setFalse()
    }

    const onNotFound = () => {
      // Handle what happens when no results are found
      setSearchResults([])
    }

    // Call the handleSearch function with the constructed URL
    handleSearch(url, onFound, onNotFound)
  }, [location.search])

  const handleGenreChange = (genre) => setSearchGenre(genre)
  const handleVerifyChange = (verifyStatus) => setSearchVerify(verifyStatus)
  const handleBudgetChange = (e) => {
    setSearchBudget(budget)
  }

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
        Result for &quot;{searchTerm}&quot;
        {searchBudget && 'within the budget of ' + searchBudget + ' Baht'}
        {searchGenre && 'and is in ' + searchGenre + ' Genre'}
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
              onSelect={handleVerifyChange}
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
              value={budget}
              onChange={handleBudgetChange}
            />
          </div>
          <div className='w-[300px] h-3/5'>
            <p className='text-lg font-medium h-1/2 flex items-center'>Genre</p>
            <DropdownForFilterBar
              options={GenreOption}
              placeHolder='Any'
              onSelect={handleGenreChange}
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

      <div style={centerdiv} className='flex justify-center w-full px-10 m-auto z-1'>
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
