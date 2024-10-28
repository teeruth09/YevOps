import { useState, useEffect } from 'react'
import RequestOrderCard from './RequestOrderCard'
import { Link } from 'react-router-dom'

const ShopOrderRequestHistory = () => {
  const [activeTab, setActiveTab] = useState('All')
  // type of order
  // {
  //   id: 1, // Add an ID for easier identification
  //   firstname: 'Teeruth',
  //   order_picture:
  //     'https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain',
  //   imageProfile:
  //     'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain',
  //   createAt: '15 Aug 2024',
  //   deadline: '20 Aug 2024',
  //   status: 'Waiting',
  //   price: '100.00 THB',
  //   orderType: 'Basic',
  //   order_detail: 'หาร้านตัดชุดสูทสำหรับงานราตรี',
  // }
  const [orders, setOrders] = useState([]) // Array to store fetched orders

  const tabs = [
    'All',
    'New Request',
    'In Progress',
    'Success',
    'Late',
    'Canceled',
  ]

  useEffect(() => {
    async function fetchShopOrdersRequest() {
      const token = localStorage.getItem('x-access-token')
      try {
        const response = await fetch('http://localhost:5555/requestsOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }) // Replace with your API endpoint
        const data = await response.json()
        console.log('Order', data)
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    fetchShopOrdersRequest()
  }, [])

  const statusConditions = {
    All: () => true,
    'In Progress': (status) => ['In Progress', 'Sending'].includes(status),
    Success: (status) =>
      [
        'Complete',
        'Delivered',
        'Complete-Not Review',
        'Complete-Review',
      ].includes(status),
    Late: (status) => status === 'Due Dated',
    Canceled: (status) => status === 'Canceled',
    'New Request': (status) => ['New Request', 'Pending'].includes(status),
    Other: (status) => ['Waiting', 'Payment'].includes(status),
  }

  const filteredOrders =
    activeTab === 'All'
      ? orders
      : orders.filter((order) =>
          (statusConditions[activeTab] || statusConditions['Other'])(
            order.status
          )
        )

  return (
    <div className='px-5 lg:px-20 w-full flex flex-col justify-center'>
      <p className='pt-3 text-3xl font-semibold mb-8'>
        Order History
      </p>

      <div className='flex border-b h-full w-fit px-12 bg-white shadow-xl rounded-lg my-3 justify-center'>
        {tabs.map((tab) => (
          <button
            key={tab}
            // TODO: make this responsive
            className={`md:px-4 lg:px-8 py-4 focus:outline-none ${
              activeTab === tab
                ? 'text-black border-b-2 border-red-600'
                : 'text-gray-600 hover:text-black'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='pt-1'>
        {filteredOrders.map((order) => (
          <Link
            key={order.id}
            to={`/shop/viewrequest/${order._id}`}
            state={{ orderId: order._id }}
          >
            <RequestOrderCard key={order.id} orderInfo={order} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopOrderRequestHistory
