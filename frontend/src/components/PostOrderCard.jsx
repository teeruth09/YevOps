import dayjs from 'dayjs'
import { cn } from '@/lib/utils'

/* eslint-disable react/prop-types */
const PostOrderCard = ({ orderInfo }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Waiting':
        return 'text-gray-500'
      case 'New Request':
        return 'text-sky-500'
      case 'Payment':
        return 'text-indigo-500'
      case 'In Progress':
        return 'text-yellow-500'
      case 'Canceled':
        return 'text-red-500'
      case 'Sending':
        return 'text-yellow-500'
      case 'Due Dated':
        return 'text-red-500'
      case 'Complete':
        return 'text-green-500'
      case 'Delivered':
        return 'text-green-500'
      default:
        return '' // Or a fallback color if needed
    }
  }

  return (
    <div className='max-w-full w-full bg-white shadow-xl rounded-lg my-5 overflow-hidden'>
      <div className='flex flex-col md:flex-row md:min-w-[160px]'>
        <div className='flex bg-gray-100 px-4'>
          <div className='relative w-1/2 mt-auto mb-auto md:w-36 md:h-36 aspect-[4/3]'>
            <img
              src={orderInfo.order_picture}
              alt='ชุดสูท'
              className='absolute origin-center -right-1/2 md:inset-0 w-full h-full object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col flex-grow p-3'>
          <div className='flex items-center'>
            <img
              src={orderInfo.client_profile}
              alt='รูปโปรไฟล์ลูกค้า'
              className='rounded-full w-10 h-10 flex-shrink-0 object-cover md:w-12 md:h-12'
            />
            <div className='flex-grow pl-3'>
              <div className='flex justify-between items-center'>
                <p className='font-bold'>{orderInfo.client_name}</p>
                <p
                  className={cn(
                    'text-sm md:text-md font-bold',
                    getStatusColor(orderInfo.order_status)
                  )}
                >
                  {orderInfo.order_status}
                </p>
              </div>

              <div className='grid grid-cols-2 gap-1 w-full'>
                <p className='text-xs md:text-sm'>
                  {dayjs(orderInfo.post_date).format('DD/M/YYYY')}
                </p>
                <div className='flex justify-end'>
                  <p className='text-xs md:text-sm text-red-800 whitespace-nowrap'>
                    Due {dayjs(orderInfo.due_date).format('DD/M/YYYY')}
                  </p>
                </div>
              </div>

              <p className='w-full text-xs md:text-sm text-end text-red-800 font-bold'>
                {orderInfo.price}
              </p>
            </div>
          </div>
          <hr className='border-t-2 border-gray-300 py-1' />
          <p className='text-xs md:text-sm break-words w-full line-clamp-5'>
            {orderInfo.order_detail}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostOrderCard
