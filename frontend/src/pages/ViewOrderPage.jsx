import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom' // Import useLocation
import ViewOrder from '@/components/ViewOrder'
import { useParams } from 'react-router-dom'
const ViewOrderPage = () => {
  const location = useLocation() // Hook to get the location object

  const { orderId } = location.state || {}
  // const { orderId } = useParams(); // Get orderId from the URL

  console.log('OrderId', orderId)

  if (!orderId) {
    console.error('Order ID is undefined')
    return <div>Error: Order ID is missing.</div>
  }

  const [order, setOrder] = useState({
    status: 'In Progress', // Default value
    name: 'Basic', // Default value
    code: '9ARMS', // Default value
    detail: 'The basic pack...', // Default value
    total: 500, // Default value
    discount: 100, // Default value
    fee: 20, // Default value
    pay: 500 - 100 + 20, // Default value
  })

  const [shop, setShop] = useState({
    shopName: 'Nai_mama dotshop',
    shopDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    imageProfile:
      'https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain',
    tag: ['Basic', 'Cosplay'],
    confirmDeadline: '17 Sep 2024',
    confirmPrice: 2000,
  })

  const [client, setClient] = useState({
    fullname: 'นายสมศักดิ์ รัตนเกียรติภูมิชัยกุล',
    phone: '08x-123-4567',
    address: '123/342 ศรีนครินทร์ 43 ประเวศ ประเวศ กรุงเทพ 10250',
    size: 'ขนาดตัวของ สมชาย',
    payment: [
      'VISA Kasikornbank [Default] *5199',
      'VISA Kasikornbank [Default] *4321',
    ],
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-GB', options)
  }

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId) {
        console.error('Order ID is undefined.')
        return
      }
      try {
        const response = await fetch(
          `http://localhost:5555/order/orderdetail/${orderId}`,
          {
            method: 'GET',
          }
        )
        const data = await response.json()

        setClient({
          fullname: data.clientId.firstname + ' ' + data.clientId.lastname,
          phone: data.clientId.phone,
          address: data.clientId.address,
          size: data.clientSize,
        })
        const shopReplyDescription = data.shopReplyDescription || {}
        setShop({
          shopName: data.shopId.shopName,
          shopDescription: data.shopId.shopDescription,
          imageProfile: data.shopId.imageProfile,
          confirmDeadline: shopReplyDescription.confirmDeadline
            ? formatDate(shopReplyDescription.confirmDeadline)
            : 'N/A', // Set default value if undefined
          confirmPrice: shopReplyDescription.confirmPrice || 0, // Use 0 if confirmPrice is undefined
        })
        const totalPrice =
          data.status === 'Payment'
            ? shopReplyDescription.confirmPrice
            : data.price
        const discount = data.discount || 0
        const fee = data.fee || 0
        const pay = totalPrice - discount + fee
        setOrder({
          status: data.status,
          name: data.orderType,
          total: totalPrice,
          discount: discount,
          fee: fee,
          pay: pay,
        })
        console.log('Hello data', data)
        if (response.ok) {
          console.log('Order Id Detail:', data)
          // setShopDetail(data)
        } else {
          console.log('Fail to fetch shop', data)
        }
      } catch (error) {
        console.error('Error fetch shop info:', error)
      }
    }
    fetchOrderDetail()
  }, [orderId]) //Add orderId as a dependency

  const handleOrderChage = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='w-screen'>
      <ViewOrder
        shop={shop}
        client={client}
        order={order}
        onCodeChage={handleOrderChage}
        orderId={orderId}
      />
    </div>
  )
}

export default ViewOrderPage
