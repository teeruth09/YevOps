import React  from 'react'

const OrderCard = ({ orderInfo }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'text-gray-500';
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
            case 'Rejected':
                return 'text-red-500';
            case 'Complete':
                return 'text-green-500';
            case 'Complete-Review':
                return 'text-green-500';
            case 'Complete-Not Review':
                return 'text-green-500';
            case 'Delivered':
                return 'text-green-500';
            default:
                return ''; // Or a fallback color if needed
        }
      };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "short", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    };
    
    
    // Ensure orderInfo and shopId exist before rendering
    if (!orderInfo || !orderInfo.shopId) {
        return null; // or a loading spinner, or fallback UI
    }

    const createAt = formatDate(orderInfo.createAt)
    const deadline = formatDate(orderInfo.deadline)
    
    return (
    <div className='w-full lg:w-auto h-auto bg-white shadow-xl px-3 rounded-lg my-5'>
      <div className='flex'>
            <img src={orderInfo.userRequestDescription.referenceImage[0]} alt="ชุดสูท" className='w-52 h-52 mr-3' />
            <div>
                <div className='flex py-3'>
                    <img src={orderInfo.shopId.imageProfile} alt="รูปโปรไฟล์ร้าน" className='rounded-full w-12 h-12' />
                    <div>

                        <div className='flex px-2' >
                            <p className='font-bold flex-auto'>{orderInfo.shopId.shopName}</p>
                            <p className={`font-bold ${getStatusColor(orderInfo.status)}`}>{orderInfo.status}</p>

                        </div>
                        <div className='flex px-2 '>
                            <p className='text-sm flex-auto pr-3'>{createAt}</p>
                            <p className='text-sm flex-auto'>Due {deadline}</p>
                            <p className='text-sm ml-20'>{orderInfo.price}</p>

                        </div>
                    </div>

                </div>
                <hr className="border-t-2  border-gray-300 py-1" />
                <p >{orderInfo.orderType}</p>
                <p className='w-80'>{orderInfo.shopId.shopDescription}</p>
            </div>
      </div>
    </div>
    )
}

export default OrderCard
