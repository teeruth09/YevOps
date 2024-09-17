import React from 'react'

const DeliveryAddressInfoCard = (props) => {
  return (
    <div className='mb-8 p-8 rounded-lg shadow-2xl bg-white'>
        <h3 className='font-bold text-2xl mb-8'>Delivery Address</h3>
        <hr className='mb-8' />
        <p className='font-bold'>{props.client_name}</p>
        <p>{props.client_phone}</p>
        <p>{props.client_address}</p>
        <button className="w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-5">
          Change
        </button>
    </div>
  )
}

export default DeliveryAddressInfoCard
