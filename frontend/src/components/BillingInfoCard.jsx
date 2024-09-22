import React from 'react'

function BillingInfoCard(props) {
  return (
    <div className='mb-8 p-8 rounded-lg shadow-2xl bg-white'>
        <h3 className='font-bold text-2xl mb-8'>Billing Information</h3>
        <hr className='mb-8' />
        <p className='mb-8'>Your invoice will be issued according to the details listed here.</p>
        <p className='font-bold'>{props.client_name}</p>
        <p>{props.client_phone}</p>
        <p>{props.client_address}</p>
    </div>
  )
}

export default BillingInfoCard
