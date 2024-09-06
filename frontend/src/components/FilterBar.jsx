import React from 'react'

const Filterbar = () => {
    const bottomShadowStyle = {
      boxShadow: '0 6px 16px rgba(255, 68, 67, 0.65)',
      zIndex: -1, 
    };
  
  return (
    <div style={bottomShadowStyle} className='w-100 h-[150px] mb-12 flex justify-around'>
        <div>
          amon
        </div>
        <div>
          asd
        </div>
        <div>
          asdasd
        </div>
      </div>
  )
}

export default Filterbar