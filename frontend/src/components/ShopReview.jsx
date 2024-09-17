import React from 'react'
import ShopCarousel from '@/components/view-shop/ShopCarousel'
import {CommentCard,} from '@/components/view-shop/DetailCards'
const ShopReview = () => {
  const mockImages = [
    'mock-products/hitman-suit.png',
    'mock-products/wedding-dress.png',
    'mock-products/shop-preview.png',
    'login-background.png',
    'profile.png',
  ]
  return (
    <div className='px-5 lg:px-20'>
        <div className='py-3 text-3xl font-semibold mb-4'>Review History</div>
        <CommentCard />
    </div>
  )
}

export default ShopReview
