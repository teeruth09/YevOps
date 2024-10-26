import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import ClientPurchaseHistory from '../components/ClientPurchaseHistory'

const ClientProfileHistoryPage = () => {
  return (
    <div>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar />
        <div className='pl-[300px]'>
          <ClientPurchaseHistory />
        </div>
      </div>
    </div>
  )
}

export default ClientProfileHistoryPage
