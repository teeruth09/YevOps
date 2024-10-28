import {
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaQuestionCircle,
  FaListAlt,
  FaRegPaperPlane,
} from 'react-icons/fa'

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
      order_detail: 'หาร้านตัดชุดสูทสำหรับงานราตรี "Happy Birthday to You", or simply "Happy Birthday", is a song traditionally sung to celebrate a persons birthday. According to the 1998 Guinness World Records, it is the most recognized song in the English language, followed by For Hes a Jolly Good Fellow. The songs base lyrics have been translated into at least 18 languages.[1] The melody of Happy Birthday to You comes from the song Good Morning to All,[2] which has traditionally been attributed to American sisters Patty and Mildred J. Hill in 1893,[3][4] although the claim that the sisters composed the tune is disputed.[5]',
    },
  ]) // Array to store fetched orders

  const tabs = [
    { name: 'All', icon: <FaListAlt /> },
    { name: 'New Request', icon: <FaRegPaperPlane /> },
    { name: 'In Progress', icon: <FaSpinner /> },
    { name: 'Success', icon: <FaCheckCircle /> },
    { name: 'Failed', icon: <FaTimesCircle /> },
    { name: 'Other', icon: <FaQuestionCircle /> },
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
