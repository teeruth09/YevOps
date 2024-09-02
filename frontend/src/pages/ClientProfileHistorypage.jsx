import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import ClientPurchaseHistory from '../components/ClientPurchaseHistory'

const ClientProfileHistoryPage = () => {
  return (
    <div>
      <NavbarClient/>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar/>
        <ClientPurchaseHistory/>
      </div>
    </div>
  )
}

export default ClientProfileHistoryPage
