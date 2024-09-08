import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import Shopcard from '@/components/ShopCard'
import ClientFavoriteShop from '@/components/ClientFavoriteShop'


const ClientProfileFavoritePage = () => {
 
  return (
    <div>
      <NavbarClient/>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar/>
        <div className='px-5 lg:px-20'>
          <ClientFavoriteShop/>

        </div>
      </div>
    </div>
  )
}

export default ClientProfileFavoritePage
