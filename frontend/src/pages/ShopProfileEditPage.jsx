import React from 'react'
import NavbarShop from '@/components/NavbarShop'
import ShopSidebar from '@/components/ShopSidebarProfile'
import ShopEditProfile from '@/components/ShopEditProfile'

const ShopProfileEditPage = () => {
  return (
    <div>
      <div className='flex pl-5 pt-5'>
        <ShopSidebar />
        <div className='pl-[300px]'>
          <ShopEditProfile />
        </div>
      </div>
    </div>
  )
}

export default ShopProfileEditPage
