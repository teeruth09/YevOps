import React  from 'react'

const RequestOrderCard = ({ orderInfo }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'Waiting':
                return 'text-gray-500';
            case 'New Request':
                return 'text-sky-500';
            case 'Payment':
                return 'text-indigo-500';
            case 'In Progress':
                return 'text-yellow-500	'
            case 'Canceled':
                return 'text-red-500';
            case 'Sending':
                return 'text-yellow-500';
            case 'Due Dated':
                return 'text-red-500';
            case 'Complete':
                return 'text-green-500';
            case 'Delivered':
                return 'text-green-500';
            default:
                return ''; // Or a fallback color if needed
        }
      };

    return (
    <div className='w-full lg:w-auto h-auto bg-white shadow-xl px-3 rounded-lg my-5'>
      <div className='flex'>
            <img src={orderInfo.order_picture} alt="ชุดสูท" className='w-52 h-52 mr-3' />
            <div>
                <div className='flex py-3'>
                    <img src={orderInfo.client_profile} alt="รูปโปรไฟล์ลูกค้า" className='rounded-full w-12 h-12' />
                    <div>

                        <div className='flex px-2' >
                            <p className='font-bold flex-auto'>{orderInfo.client_name}</p>
                            <p className={`font-bold ${getStatusColor(orderInfo.order_status)}`}>{orderInfo.order_status}</p>

                        </div>
                        <div className='flex px-2 '>
                            <p className='text-sm flex-auto pr-3'>{orderInfo.post_date}</p>
                            <p className='text-sm flex-auto'>Due {orderInfo.due_date}</p>
                            <p className='text-sm ml-20'>{orderInfo.price}</p>

                        </div>
                    </div>

                </div>
                <hr className="border-t-2  border-gray-300 py-1" />
                <p >{orderInfo.type_order}</p>
                <p className='w-80'>{orderInfo.order_detail}</p>
            </div>
      </div>
    </div>
    )
}

export default RequestOrderCard
