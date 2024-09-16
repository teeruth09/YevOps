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
        <div className='pl-[300px]'>
          <ClientFavoriteShop/>
        </div>
      </div>
    </div>
  )
}

export default ClientProfileFavoritePage
