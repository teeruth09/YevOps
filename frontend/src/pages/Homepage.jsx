import React from 'react'
import Navbar from '../components/Navbar'
import NavbarClient from '../components/NavbarClient'
import NavbarShop from '../components/NavbarShop'
import NavbarAdmin from '../components/NavbarAdmin'
import Filterbar from '@/components/FilterBar'
import Shopcard from '@/components/ShopCard'
import myImage from '../../public/website_picture.png'; // Assuming your component is in src/components

const HomePage = () => {
  const centerdiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,432px)',
  }
  return (
    <div>
      {/* Navbar */}
      <Navbar/>

      <div className='flex flex-col items-center'>
        {/* Landing pic */}
        <img className='w-auto h-auto my-10' src={myImage} alt="" />
        

        {/* Filterbar */}
        <Filterbar/>

        {/* Placing cards  */}
        <div style={centerdiv} className="justify-center w-[90vw] m-auto z-1">
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Read this is gay"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Never gonna give"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          

        </div>
      </div>
      
    </div>
  )
}

export default HomePage




