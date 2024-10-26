import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import ClientPostHistory from '@/components/ClientPostHistory'

const ClientProfilePostPage = () => {
  return (
    <div>
      <div className='flex pl-5 pt-5'>
        <ClientSidebar />
        <div className='pl-[300px]'>
          <ClientPostHistory />
        </div>
      </div>
    </div>
  )
}

export default ClientProfilePostPage
