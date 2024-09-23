import React, { useState, useEffect } from 'react'

function CustomerInfoCard(props) {
    console.log("CustomerInforCard",props)
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        // Set true if the screen width is less than 640px (Tailwind's 'sm' breakpoint)
        setIsSmallScreen(window.innerWidth < 1200);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize the state on mount

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

  const truncatedAddress = isSmallScreen ? `${props.address.slice(0, 20)}...` : props.address;

  return (
    <div className='mb-8 p-8 rounded-lg shadow-2xl bg-white'>
        <h3 className='font-bold text-2xl mb-8'>Customer Information</h3>
        <hr className='mb-8' />
        <div className='mb-5'>
            <p className='ml-1 text-lg'>Delivery Address</p>
            <div className='flex gap-x-5 flex-col 2xl:flex-row'>
            <div className="flex flex-nowrap items-center border border-gray-300 rounded-xl w-full h-10 px-5 mb-4 lg:mb-0">
                <p>{truncatedAddress}</p>
            </div>
            </div>
        </div>
        <div>
            <p className='ml-1 text-lg'>Size Profile</p>
            <div className='flex gap-x-5 flex-col 2xl:flex-row'>
                <div className="flex items-center border border-gray-300 rounded-xl w-full h-10 px-5 mb-4 lg:mb-0">
                    <p>ขนาดตัวของ {props.fullname}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomerInfoCard
