import React from 'react'
import NavbarClient from '../components/NavbarClient'
import ClientSidebar from '../components/ClientSidebarProfile'
import ClientBankProfile from '@/components/ClientBankProfile'

const ClientProfileBankPage = () => {
  return (
    <div>
        <NavbarClient/>
        <div className='flex pl-5 pt-5'>
            <ClientSidebar/>
            <div className='pl-[300px]'>
              <ClientBankProfile/>
            </div>
        </div>        
    </div>
  )
}

export default ClientProfileBankPage
