import React from 'react'
import NavbarShop from '@/components/NavbarShop'
import ShopSidebar from '@/components/ShopSidebarProfile'
import ShopEditProfile from '@/components/ShopEditProfile'

const ShopProfileEditPage = () => {
  return (
    <div>
        <NavbarShop/>
        <div className='flex pl-5 pt-5'>
            <ShopSidebar/>
            <ShopEditProfile/>
        </div>
    </div>
  )
}

export default ShopProfileEditPage
