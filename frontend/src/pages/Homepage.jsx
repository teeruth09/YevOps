import React from 'react'
import Navbar from '../components/Navbar'
import NavbarClient from '../components/NavbarClient'
import NavbarShop from '../components/NavbarShop'
import NavbarAdmin from '../components/NavbarAdmin'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      {/* <NavbarClient/>
      <NavbarShop/>
      <NavbarAdmin/> */}
      <div className='text-center text-red-700'>
            HomePage
        </div>
    </div>
  )
}

export default HomePage




