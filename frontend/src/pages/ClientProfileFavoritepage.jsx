import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'

const ClientProfileFavoritePage = () => {
  return (
    <div>
      <NavbarClient/>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar/>
        
      </div>
    </div>
  )
}

export default ClientProfileFavoritePage
