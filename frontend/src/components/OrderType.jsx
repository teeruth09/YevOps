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
      alert('Please log in before order product')
    } else {
      if (role === 'client') {
        //Send only the selected order type based on viewPackage
        const selectedOrderTypeId = orderTypeIds[viewPackage]?._id
        if (selectedOrderTypeId) {
          navigate('/order/information', {
            state: { sendShopId: shopId, sendOrderTypeId: selectedOrderTypeId },
          }) //pass shopId
        }
      }
    }
  }
  // console.log("orderTypeIds afmkamkgemkkamkmkaa,fe,l",orderTypeIds);
  // Fetch shop's Order type (1-3)
  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const fetchedOrderTypes = await Promise.all(
          orderTypeIds.map(async (orderType) => {
            const response = await fetch(
              `http://localhost:5555/orderTypes/getdetail/`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderTypeId: orderType._id }),
              }
            )
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            const data = await response.json()
            return data // Returns order type details
          })
        )

        setOrderTypes(fetchedOrderTypes)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    if (orderTypeIds.length > 0) {
      fetchOrderDetails() // Fetch only if orderTypeIds is not empty
    }
  }, [orderTypeIds])

  return (
    <div className='w-[500px] h-fit border-[1px]'>
      <div className='flex flex-row justify-around items-center w-full h-[60px]'>
        {orderTypes.map((orderType, index) => (
          <button
            key={index}
            onClick={() => setViewPackage(index)}
            className='border-[1px] w-full h-full flex items-center justify-center text-xl font-medium hover:bg-gray-200'
          >
            <p>{orderType.name}</p>
          </button>
        ))}
      </div>

      {viewPackage == 0 && (
        <div className='flex flex-col items-center'>
          <div className='flex flex-row w-full justify-between px-10'>
            <p className='text-2xl font-medium pt-6'>{orderTypes[0].name}</p>
            <p className='text-3xl font-medium pt-5'>
              {orderTypes[0].price} THB
            </p>
          </div>
          <div className='w-full flex flex-row items-center justify-start pt-10 pl-10'>
            <FaClock size={20} />
            <p className='text-xl font-bold pl-1'>
              {orderTypes[0].deadline} Days
            </p>
          </div>
          <p
            style={{ whiteSpace: 'pre-line' }}
            className='text-l font-medium pt-5 px-10 text-gray-700'
          >
            {orderTypes[0].detail}
          </p>
          <button
            className='my-10 w-[90%] h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700'
            onClick={handleOrder}
          >
            Order Now
          </button>
        </div>
      )}
      {viewPackage == 1 && (
        <div className='flex flex-col items-center'>
          <div className='flex flex-row w-full justify-between px-10'>
            <p className='text-2xl font-medium pt-6'>{orderTypes[1].name}</p>
            <p className='text-3xl font-medium pt-5'>
              {orderTypes[1].price} THB
            </p>
          </div>
          <div className='w-full flex flex-row items-center justify-start pt-10 pl-10'>
            <FaClock size={20} />
            <p className='text-xl font-bold pl-1'>
              {orderTypes[1].deadline} Days
            </p>
          </div>
          <p
            style={{ whiteSpace: 'pre-line' }}
            className='text-l font-medium pt-5 px-10 text-gray-700'
          >
            {orderTypes[1].detail}
          </p>
          <button
            className='my-10 w-[90%] h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700'
            onClick={handleOrder}
          >
            Order Now
          </button>
        </div>
      )}
      {viewPackage == 2 && (
        <div className='flex flex-col items-center'>
          <div className='flex flex-row w-full justify-between px-10'>
            <p className='text-2xl font-medium pt-6'>{orderTypes[2].name}</p>
            <p className='text-3xl font-medium pt-5'>
              {orderTypes[2].price} THB
            </p>
          </div>
          <div className='w-full flex flex-row items-center justify-start pt-10 pl-10'>
            <FaClock size={20} />
            <p className='text-xl font-bold pl-1'>
              {orderTypes[2].deadline} Days
            </p>
          </div>
          <p
            style={{ whiteSpace: 'pre-line' }}
            className='text-l font-medium pt-5 px-10 text-gray-700'
          >
            {orderTypes[2].detail}
          </p>
          <button
            className='my-10 w-[90%] h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700'
            onClick={handleOrder}
          >
            Order Now
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderType
