import React from 'react'
import NavbarShop from '@/components/NavbarShop'
import ShopSidebar from '@/components/ShopSidebarProfile'
import ShopOrderRequestHistory from '@/components/ShopOrderRequestHistory'

const ShopProfileOrderHistoryPage = () => {
  return (
    <div>
        <NavbarShop/>
        <div className='flex pl-5 pt-5'>
            <ShopSidebar/>
            <div className='pl-[300px]'>
                <ShopOrderRequestHistory/>
            </div>
        </div>        
    </div>
  )
}

export default ShopProfileOrderHistoryPage