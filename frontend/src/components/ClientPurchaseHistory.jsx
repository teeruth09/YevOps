import {
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaQuestionCircle,
  FaListAlt,
} from 'react-icons/fa'

import { useState, useEffect } from 'react'
import OrderCard from './OrderCard'
import { Link } from 'react-router-dom'
import Tabs from '@/shared/components/Tabs'
import PostOrderCard from './PostOrderCard'

const ClientPurchaseHistory = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [orders, setOrders] = useState([
    {
      id: 1, // Add an ID for easier identification
      shopName: 'The Sewing shop',
      order_picture:
        'https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain',
      imageProfile:
        'https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain',
      createAt: '15 Aug 2024',
      deadline: '20 Aug 2024',
      status: 'Pending',
      price: '100.00 THB',
      orderType: 'Basic',
      order_detail: 'รับตัดชุทสูททุกชนิด',
    },
  ]) // Array to store fetched orders

  const tabs = [
    { name: 'All', icon: <FaListAlt /> },
    { name: 'Success', icon: <FaCheckCircle /> },
    { name: 'In Progress', icon: <FaSpinner /> },
    { name: 'Failed', icon: <FaTimesCircle /> },
    { name: 'Other', icon: <FaQuestionCircle /> },
  ]

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem('x-access-token')
      try {
        const response = await fetch('http://localhost:5555/order/history', {
          method: 'GET',
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

    fetchOrders()
  }, [])

  const statusConditions = {
    All: () => true,
    'In Progress': (status) => ['In Progress', 'Sending'].includes(status),
    Success: (status) =>
      [
        'Complete-Not Review',
        'Complete-Review',
        'Complete',
        'Delivered',
      ].includes(status),
    Failed: (status) => ['Due Dated', 'Rejected', 'Canceled'].includes(status),
    Other: (status) => ['Pending', 'Payment'].includes(status),
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
    <div className='px-5 w-full flex flex-col items-center'>
      <p className='pt-3 text-3xl font-semibold mb-8 self-start'>
        Purchase History
      </p>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='w-full pt-1'>
        {filteredOrders.map((order) => (
          <Link
            key={order.id}
            to={`/order/${order._id}`}
            state={{ orderId: order._id }}
          >
            <OrderCard key={order.id} orderInfo={order} />
            {/* <PostOrderCard key={order.id} orderInfo={order} /> */}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ClientPurchaseHistory
