import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import OrderInformation from '@/components/OrderInformation'

const OrderInformationPage = () => {
  const location = useLocation() // Hook to get the location object

  // Access the state passed via `navigate`
  const { sendShopId } = location.state || {}
  const { sendOrderTypeId } = location.state || {}

  const [order, setOrder] = useState({
    name: 'Basic',
    price: '3000',
    detail:
      'The basic pack, low detail cosplay and i write this to test if the message is like 400 characters long will it able to fit in',
    deadline: '14',
  })

  const [shop, setShopInfo] = useState({
    shopId: '',
    shopName: 'Nai_mama dotshop',
    imageProfile: '',
    previewImage: [],
  })

  const [client, setClientInfo] = useState({
    fullname: 'นายสมศักดิ์ รัตนเกียรติภูมิชัยกุล',
    phone: '08x-123-4567',
    address: '123/342 ศรีนครินทร์ 43 ประเวศ ประเวศ กรุงเทพ 10250',
    size: '',
  })

  const [userRequest, setUserRequest] = useState({
    clothType: '',
    budgetStart: '',
    budgetStop: '',
    deadline: '',
    referenceImage: [],
  })

  useEffect(() => {
    async function fetchClientData() {
      const token = localStorage.getItem('x-access-token')
      try {
        const response = await fetch('http://localhost:5555/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        })
        const data = await response.json()
        setClientInfo({
          fullname: `${data.firstname} ${data.lastname}`,
          phone: data.phone,
          address: data.address,
          size: data.clientSize._id,
        })
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }
    fetchClientData()
  }, [])

  useEffect(() => {
    const fetchShopProfile = async () => {
      const token = localStorage.getItem('x-access-token') // Get token here
      try {
        const response = await fetch(
          `http://localhost:5555/shop/shopdata/${sendShopId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
          }
        )
        const data = await response.json()
        setShopInfo({
          shopId: sendShopId,
          shopName: data.shopName,
          imageProfile: data.imageProfile,
          previewImage: data.previewImage,
        })
        if (response.ok) {
          console.log('Shop Profile:', data)
        } else {
          console.log('Fail to fetch shop', data)
        }
      } catch (error) {
        console.error('Error fetch shop info:', error)
      }
    }
    fetchShopProfile()
  }, [sendShopId])

  useEffect(() => {
    async function fetchOrderTypeDetails() {
      try {
        const response = await fetch(
          `http://localhost:5555/orderTypes/getdetail/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderTypeId: sendOrderTypeId }),
          }
        )
        const data = await response.json()
        setOrder({
          name: data.name,
          price: data.price,
          detail: data.detail,
          deadline: data.deadline,
        })
      } catch (error) {
        console.error('Error fetch OrderType info:', error)
      }
    }
    fetchOrderTypeDetails()
  }, [sendOrderTypeId])

  const handleOrderChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <OrderInformation
        shop={shop}
        client={client}
        order={order}
        userRequest={userRequest}
        onCodeChange={handleOrderChange}
      />
    </div>
  )
}

export default OrderInformationPage
