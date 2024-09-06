import React from 'react'

function CustomerInfoCard(props) {
  return (
    <div className='mb-50 p-8 rounded-lg shadow-2xl bg-white'>
        <h3 className='font-bold text-2xl mb-8'>Customer Information</h3>
        <hr className='mb-8' />
        <div className='mb-5'>
            <p className='ml-1 text-lg'>Delivery Address</p>
            <div className='flex gap-x-5'>
            <div className="flex items-center border border-gray-300 rounded-xl w-full h-10 px-5 mb-4 lg:mb-0">
                    <p>{props.address}</p>
                </div>
                <button className="w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border px-4 rounded-xl border border-gray-300">
                    Change
                </button>
            </div>
        </div>
        <div>
            <p className='ml-1 text-lg'>Size Profile</p>
            <div className='flex gap-x-5'>
                <div className="flex items-center border border-gray-300 rounded-xl w-full h-10 px-5 mb-4 lg:mb-0">
                    <p>{props.size}</p>
                </div>
                <button className="w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded-xl border border-gray-300">
                    Change
                </button>
            </div>
        </div>
    </div>
  )
}

export default CustomerInfoCard
