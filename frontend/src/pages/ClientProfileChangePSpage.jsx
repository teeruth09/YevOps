import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import ChangePassword from '../components/ChangePassword'
const ClientProfileChangePsPage = () => {
  return (
    <div>
      <NavbarClient/>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar/>
        <ChangePassword/>
      </div>
    </div>
  )
}

export default ClientProfileChangePsPage
