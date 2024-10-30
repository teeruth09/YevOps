/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

const Shopcard = ({
  genre,
  shopId,
  previewImage,
  verifyStatus,
  shopProfile,
  shopName,
  shopRating,
  reviewCount,
  shopDescription,
  startBudget,
  stopBudget,
}) => {
  const max3lines = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  const [price, setPrice] = useState(null)

  // Fetch order types if startBudget exists
  useEffect(() => {
    const fetchedOrderTypesId = async () => {
      const token = localStorage.getItem('x-access-token')
      try {
        const response = await fetch(
          'http://localhost:5555/orderTypes/getdetail/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({
              orderTypeId: startBudget,
            }),
          }
        )
        const data = await response.json()
        setPrice(data.price)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    // Only fetch if startBudget exists
    if (startBudget) {
      fetchedOrderTypesId()
    }
  }, [startBudget]) // Depend on startBudget, so it fetches only when it changes

  return (
    <div className='flex flex-col items-center m-4 w-[400px] h-[500px] rounded-sm border-[4px]'>
      {/* Shop preview picture */}
      <img
        className='mt-4 w-[368px] h-[200px] rounded-md object-cover'
        src={previewImage[0]}
        alt='Image'
      />
      {/* Shop pfp, name, rating */}
      <div className='flex justify-start relative mt-6 w-[368px] h-[60px]'>
        <img className='w-[60px] h-100 rounded-full' src={shopProfile} alt='' />
        <div className='flex flex-col ml-4 w-60 h-100'>
          <div className='flex justify-start items-center h-[30px]'>
            <p className='text-2xl font-bold'>{shopName}</p>
            {verifyStatus && (
              <img
                className='w-[28px] h-[28px] ml-2'
                src='https://cdn-icons-png.flaticon.com/128/11412/11412145.png'
                alt=''
              />
            )}
          </div>
          <div className='flex justify-start items-center h-[30px]'>
            <Stack spacing={1}>
              <Rating defaultValue={shopRating} precision={0.1} readOnly />
            </Stack>
            <p className='text-sm font-medium ml-1 mt-0.5 text-gray-400'>
              {shopRating} ({reviewCount})
            </p>
          </div>
        </div>
        <div className='absolute top-0 right-2'>
          <img
            className='w-[24px] h-[24px]'
            src='https://cdn-icons-png.flaticon.com/128/151/151910.png'
            alt=''
          />
        </div>
      </div>
      {/* Genre */}
      <div className='w-[348px] mt-4 text-xl font-bold'>
        Specialized at {genre}
      </div>
      {/* Shop description 3 lines */}
      <div style={max3lines} className='w-[348px] h-[76px] mt-2'>
        {shopDescription}
      </div>
      {/* Budget */}
      <p className='w-[368px] mt-2.5 ml-4 text-2xl font-bold'>
        Starts at : {price} THB
      </p>
    </div>
  )
}

export default Shopcard
