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
        <div className='pl-[300px]'>
          <ChangePassword/>
        </div>
      </div>
    </div>
  )
}

export default ClientProfileChangePsPage
