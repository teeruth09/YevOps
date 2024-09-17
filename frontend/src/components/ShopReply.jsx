import React from 'react'

function ShopReply(props) {
  return (
    <div className='mb-8 p-8 rounded-lg shadow-2xl bg-red-700'>
        <h3 className='font-bold text-2xl mb-8 text-white'>Shop Reply</h3>
        <hr className='mb-8' />
        <p className='mb-8 font-bold text-white'>Shop offers</p>
        <p className='font-bold text-white'>Deadline: {props.confirmDeadline}</p>
        <p className='font-bold text-white'>Price: {props.confirmPrice}  THB</p>        
    </div>
  )
}

export default ShopReply
