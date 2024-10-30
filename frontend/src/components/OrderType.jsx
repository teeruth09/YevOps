/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '@/shared/components/CustomButton'

const OrderType = ({ shopId, orderTypeIds }) => {
  const [orderTypes, setOrderTypes] = useState([
    {
      shopId: 1, // Add an ID for easier identification
      name: 'Basikkk',
      price: '3000',
      detail:
        'The basic pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in',
      deadline: '14',
    },
    {
      shopId: 1, // Add an ID for easier identification
      name: 'Advanced',
      price: '6000',
      detail:
        "The Advanced pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in but yeah i think this only 144 chars long so i'll add a little more \n \n \n \n asdasd",
      deadline: '21',
    },
    {
      shopId: 1, // Add an ID for easier identification
      name: 'Superbbb',
      price: '12000',
      detail:
        "The lorem asdljfklasdjfklajsdklfjaksldfjklasdjfl able to fit in but yeah i think this only 144 chars long so i'll add a little more \n- try1 \n- try2\n- try3\n asdasd",
      deadline: '28',
    },
  ])

  const token = localStorage.getItem('x-access-token')
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  const [viewPackage, setViewPackage] = useState(0)

  const handleOrder = () => {
    if (!token) {
      alert('Please log in before ordering')
    } else if (role === 'client') {
      navigate('/order/information', { state: { sendShopId: shopId } })
    }
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`/api/shop/shopOrderType/${shopId}`)
        const data = await response.json()
        setOrderTypes(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }
    fetchOrders()
  }, [shopId])

  return (
    <div className='w-full h-fit border-[1px]'>
      <div className='flex flex-row justify-around items-center w-full h-[60px]'>
        {orderTypes.map((orderType, index) => (
          <button
            key={index}
            onClick={() => setViewPackage(index)}
            className={`border-[1px] w-full h-full flex items-center justify-center text-xl font-medium ${
              viewPackage === index ? 'bg-gray-200' : ''
            }`}
          >
            <p>{orderType.name}</p>
          </button>
        ))}
      </div>

      {orderTypes.map(
        (orderType, index) =>
          viewPackage === index && (
            <div key={index} className='flex flex-col items-center'>
              <div className='flex flex-row w-full justify-between px-10'>
                <p className='text-2xl font-medium pt-6'>{orderType.name}</p>
                <p className='text-3xl font-medium pt-5'>
                  {orderType.price} THB
                </p>
              </div>
              <div className='w-full flex flex-row items-center justify-start pt-10 pl-10'>
                <FaClock size={20} />
                <p className='text-xl font-bold pl-1'>
                  {orderType.deadline} Days
                </p>
              </div>
              <p
                style={{ whiteSpace: 'pre-line' }}
                className='text-l font-medium pt-5 px-10 text-gray-700'
              >
                {orderType.detail}
              </p>

              <div className='w-full px-10'>
                <PrimaryButton className='my-10' onClick={handleOrder}>Order Now</PrimaryButton>
              </div>
            </div>
          )
      )}
    </div>
  )
}

export default OrderType
