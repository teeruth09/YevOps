import { useEffect, useState } from 'react'
import Filterbar from '@/components/FilterBar'
import Shopcard from '@/components/ShopCard'
import myImage from '/home-image.png' // Assuming your component is in src/components
import { Link } from 'react-router-dom'
import { endpoints } from '@/shared/endpoints'
import { TypeAnimation } from 'react-type-animation'

const HomePage = () => {
  const centerdiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,432px)',
  }
  const [allshop, setAllshop] = useState([])

  // Fetch Orders
  useEffect(() => {
    async function fetchShops() {
      try {
        const response = await fetch(endpoints.shops.shopdata) // Replace with shop API endpoint
        const data = await response.json()
        setAllshop(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    fetchShops()
  }, [])

  return (
    <div>
      <div className='flex flex-col items-center'>
        {/* Landing pic */}
        {/* <img className='w-auto h-auto my-10' src={myImage} alt='' /> */}

        <TypeAnimation
          className={`w-full h-[400px] block bg-cover bg-center p-24 font-bold text-6xl border-b-2 text-white relative overflow-hidden my-10`}
          style={{
            // How to make backgroundImage cover?
            backgroundImage: `url(${myImage})`, // Ensure myImage is formatted correctly
            textShadow:
              '0 2px 4px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(185, 28, 28, 0.8)', // black + red-800,
          }}
          sequence={[
            'Platform for those interested in tailoring shops.',
            2000,
            'Platform for those interested in cosplay events.',
            2000,
            'Platform for those interested in unique outfits.',
            2000,
            'Platform for those interested in fashion design.',
            2000,
            'Platform for those interested in creative crafts.',
            2000,
            'Platform for those interested in costume making.',
            2000,
            '',
          ]}
          repeat={Infinity}
        />

        {/* Filterbar */}
        <Filterbar />

        {/* Placing cards  */}
        <div style={centerdiv} className='justify-center w-[90vw] m-auto z-1'>
          {/* <div style={centerdiv} className="justify-center w-[90vw] m-auto z-1">
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="3.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"
          genre="Wedding"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Read this is gay"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"
          genre="Cosplay"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"
          genre="Cosplay"/>
          
        </div> */}

          {allshop.length > 0 ? (
            allshop.map((result) => {
              // Check if any of the required fields are empty

              if (
                !result.shopName ||
                !result.imageProfile ||
                !result.shopDescription ||
                !result.orderTypeIds
              ) {
                return null // Skip this shop if any of the fields are empty
              }

              return (
                <Link
                  key={result._id}
                  to={`/viewshop/${result._id}`}
                  state={{ shopId: result._id }}
                >
                  <Shopcard
                    shopId={result._id}
                    previewImage={result.previewImage}
                    verifyStatus={result.isVerified}
                    shopProfile={result.imageProfile}
                    shopName={result.shopName}
                    shopRating={result.shopRating}
                    reviewCount={result.reviewCount}
                    shopDescription={result.shopDescription}
                    startBudget={result.orderTypeIds[0]}
                    stopBudget={result.stopBudget}
                    genre={result.genre}
                  />
                  {/* <p>ShopId:{result._id}</p> */}
                </Link>
              )
            })
          ) : (
            <p>No Shop found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
