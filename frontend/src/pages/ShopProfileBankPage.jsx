import React from 'react'
import NavbarShop from '@/components/NavbarShop'
import ShopSidebar from '@/components/ShopSidebarProfile'
import ClientBankProfile from '@/components/ClientBankProfile'

const ShopProfileBankPage = () => {
  return (
    <div>
      <div className='flex pl-5 pt-5'>
        <ShopSidebar />
        <div className='pl-[300px]'>
          <ClientBankProfile />
        </div>
      </div>
    </div>
  )
}

export default ShopProfileBankPage
