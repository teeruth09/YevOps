import { useState, useEffect } from 'react'
import PostOrderCard from './PostOrderCard'
import { Link } from 'react-router-dom'
import Tabs from '@/shared/components/Tabs'

const ClientPostHistory = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [orders, setOrders] = useState([
    {
      id: 1, // Add an ID for easier identification
      client_name: 'Teeruth',
      order_picture:
        'https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain',
      client_profile:
        'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain',
      post_date: '15 Aug 2024',
      due_date: '20 Aug 2024',
      order_status: 'Waiting',
      price: '100.00 THB',
      order_detail: 'หาร้านตัดชุดสูทสำหรับงานราตรี',
    },
  ]) // Array to store fetched orders

  const tabs = [
    'All',
    'New Request',
    'In Progress',
    'Success',
    'Failed',
    'Other',
  ]

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/user/post') // Replace with your API endpoint
        const data = await response.json()
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
    Success: (status) => ['Complete', 'Delivered'].includes(status),
    Failed: (status) => ['Due Dated', 'Canceled'].includes(status),
    'New Request': (status) => status === 'New Request',
    Other: (status) => ['Waiting', 'Payment'].includes(status),
  }

  const filteredOrders =
    activeTab === 'All'
      ? orders
      : orders.filter((order) =>
          (statusConditions[activeTab] || statusConditions['Other'])(
            order.order_status
          )
        )

  return (
    <div className='px-5 lg:px-20 w-full flex flex-col items-center'>
      <p className='pt-3 text-3xl font-semibold mb-8 self-start'>My Posts</p>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='w-full pt-1'>
        {filteredOrders.map((order) => (
          <Link key={order.id} to={`/post/${order.id}`}>
            <PostOrderCard key={order.id} orderInfo={order} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ClientPostHistory
