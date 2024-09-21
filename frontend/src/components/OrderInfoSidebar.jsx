import React from 'react'
import { FaClock } from 'react-icons/fa';

const OrderInfoSideBar = ({ shop, order, onSendRequest }) => {
    // const shop = props.shop;
    // const order = props.order;

    return (
        <div className='bg-white p-10 md:w-[480px] h-fit rounded-lg shadow-2xl'>
                <div className='flex gap-x-5 mb-3 flex-col sm:flex-row'>
                    <img
                        src={shop.imageProfile}
                        alt="profile.jpg"
                        className="w-24 h-24 lg:w-32 lg:h-32"
                    />
                    <div>
                        <h4 className='font-bold text-2xl mb-2'>{shop.shopName}</h4>
                    </div>
                </div>
                <div className='mb-3'>
                    <h5 className='text-xl mb-2'>Description</h5>
                            <div className='flex flex-row w-full justify-between '>
                            <p className='text-gray-400 font-medium pt-6'>{order.name}</p>
                            <p className='font-medium pt-5'>{order.price} THB</p>
                            </div>
                            <div className='w-full flex flex-row items-center justify-start pt-5'>
                            <FaClock size={15}/>
                            <p className='font-medium pl-1'>{order.deadline} Days</p>
                            </div>
                            <p style={{ whiteSpace: 'pre-line' }} className='text-l  pt-5  text-gray-700'>{order.detail}</p>
                </div>
                <div className='mb-3'>
                    <button 
                        className={'w-full bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded mt-3 lg:mt-5'}
                        onClick={onSendRequest} // Trigger the parent’s handleSubmit
                    >
                        Send request
                    </button>
                    <button
                        className="w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-3"
                    >
                        Cancel
                    </button>
                </div>
              
        </div>
    )
}

export default OrderInfoSideBar
