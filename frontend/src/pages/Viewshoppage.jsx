import { FaStar } from 'react-icons/fa6'

import ShopCarousel from '@/components/view-shop/ShopCarousel'
import {
  CommentCard,
  MainDetailCard,
  ReviewCard,
} from '@/components/view-shop/DetailCards'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OrderType from '@/components/OrderType'
import { endpoints } from '@/shared/endpoints'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { FaAngleRight } from 'react-icons/fa6'

const Viewshoppage = () => {
  const mockImages = [
    'mock-products/hitman-suit.png',
    'mock-products/wedding-dress.png',
    'mock-products/shop-preview.png',
    'login-background.png',
    'profile.png',
  ]
  const location = useLocation()
  const { shopId } = location.state || {}
  const [shopDetail, setShopDetail] = useState({
    location: '',
    registerDate: '',
    isVerified: false,
    shopName: '',
    imageProfile: '',
    shopDescription: '',
    previewImage: [],
    phone: '',
    address: '',
    orderTypeIds: [],
  })
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-GB', options)
  }

  useEffect(() => {
    const fetchShopProfile = async () => {
      try {
        const response = await fetch(endpoints.shops.id(shopId))
        const data = await response.json()
        setShopDetail({
          ...shopDetail,
          location: data.location,
          registerDate: data.registerDate,
          isVerified: data.isVerified,
          shopName: data.shopName,
          imageProfile: data.imageProfile,
          shopDescription: data.shopDescription,
          previewImage: data.previewImage,
          phone: data.phone,
          address: data.address,
          orderTypeIds: data.orderTypeIds,
        })
        if (response.ok) {
          console.log('Shop Profile:', data)
          setShopDetail(data)
        } else {
          console.log('Fail to fetch shop', data)
        }
      } catch (error) {
        console.error('Error fetch shop info:', error)
      }
    }
    fetchShopProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col w-full p-12 gap-4'>
      <Breadcrumbs
        separator={<FaAngleRight />}
        aria-label='breadcrumb'
        sx={{ mt: 2 }}
      >
        <Link href='/'>View Shops</Link>
        <Link href={`/viewshop/${shopId}`}>Shop</Link>
      </Breadcrumbs>

      <div className='grid grid-cols-2 gap-12'>
        <div className='flex flex-col gap-2'>
          <div className='flex w-full gap-2 items-center'>
            <img
              src={shopDetail.imageProfile}
              alt='profile'
              className='w-12 h-12 rounded-full'
            />
            <p className='text-xl font-bold mx-2'>{shopDetail.shopName}</p>
            <FaStar />
            <p className='text-sm'>5.0 (37)</p>
          </div>

          <ShopCarousel imageUrls={mockImages} />

          <MainDetailCard
            address={shopDetail.address}
            phone={shopDetail.phone}
            registerDate={formatDate(shopDetail.registerDate)}
            shopDescription={shopDetail.shopDescription}
          />

          <ReviewCard
            oneStarReviewers={0}
            twoStarsReviewers={0}
            threeStarsReviewers={5}
            fourStarsReviewers={10}
            fiveStarsReviewers={15}
            numberOfAllReviewers={30}
          />

          <CommentCard />
        </div>

        <OrderType shopId={shopId} orderTypeIds={shopDetail.orderTypeIds} />
      </div>
    </div>
  )
}

export default Viewshoppage
