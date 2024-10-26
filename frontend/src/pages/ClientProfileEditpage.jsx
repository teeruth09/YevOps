import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import ClientEditProfile from '../components/ClientEditProfile'

const ClientProfileEditPage = () => {
  return (
    <div>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar />
        <div className='pl-[300px]'>
          <ClientEditProfile />
        </div>
      </div>
    </div>
  )
}

export default ClientProfileEditPage
