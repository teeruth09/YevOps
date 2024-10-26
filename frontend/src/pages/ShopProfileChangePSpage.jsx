import React from 'react'
import NavbarShop from '@/components/NavbarShop'
import ShopSidebar from '@/components/ShopSidebarProfile'
import ChangePassword from '../components/ChangePassword'
const ShopProfileChangePsPage = () => {
  return (
    <div>
      <div className='flex pl-5 pt-5'>
        <ShopSidebar />
        <div className='pl-[300px]'>
          <ChangePassword />
        </div>
      </div>
    </div>
  )
}

export default ShopProfileChangePsPage
