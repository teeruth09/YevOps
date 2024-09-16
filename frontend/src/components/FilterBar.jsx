import React from 'react'
import DropdownForFilterBar from './DropdownForFilterBar';

const VerifiedOption = ["Yes","No"];
const GenreOption = ["Suits","Wedding","Formal Dress","Police","Cosplay","Others"]

const Filterbar = () => {
    const bottomShadowStyle = {
      boxShadow: '0 6px 16px rgba(255, 68, 67, 0.65)',
    };
  
  return (
    <div style={bottomShadowStyle} className='w-[100vw] h-[120px] mb-12 sticky top-[60px] z-10 bg-white'>
      <div className='w-[90vw] h-full flex justify-around items-center m-auto'>
        <div className='w-[200px] h-3/5'>
          <p className='text-lg font-medium h-1/2 flex items-center'>Shop Verified</p>
          <DropdownForFilterBar options={VerifiedOption} placeHolder="Any"/>
        </div>
        <div className='w-[200px] h-3/5'>
        <p className='text-lg font-medium h-1/2 flex items-center'>Budget</p>
          <input 
            className='flex flex-row h-1/2 w-[200px] border-b border-red-300 text-left text-2xl font-bold focus:outline-none'
            type="number"
            min="0"
            max="999999"
            step="1000"
            placeholder='Any'
          />
        </div>
        <div className='w-[200px] h-3/5'>
        <p className='text-lg font-medium h-1/2 flex items-center'>Genre</p>
          <DropdownForFilterBar options={GenreOption} placeHolder="Any"/>
        </div>

        <div className='w-[200px] h-3/5'>
        <p className='text-lg font-medium h-1/2 flex items-center'>Rating</p>
          <input 
            className='flex flex-row h-1/2 w-[200px] border-b border-red-300 text-left text-2xl font-bold focus:outline-none'
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder='Any'
          />
        </div>
      </div>
    </div>
  )
}

export default Filterbar