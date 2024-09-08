import React from 'react'
import NavbarShop from '@/components/NavbarShop'
import ShopSidebar from '@/components/ShopSidebarProfile'
import ChangePassword from '../components/ChangePassword'
const ShopProfileChangePsPage = () => {
  return (
    <div>
        <NavbarShop/>
        <div className='flex pl-5 pt-5'>
            <ShopSidebar/>
            <ChangePassword/>
        </div>
    </div>
  )
}

export default ShopProfileChangePsPage
