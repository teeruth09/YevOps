import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import ClientEditProfile from '../components/ClientEditProfile'

const ClientProfileEditPage = () => {
  return (
    <div>
      <NavbarClient/>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar/>
        <ClientEditProfile/>
      </div>
    </div>
  )
}

export default ClientProfileEditPage
