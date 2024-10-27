import React, {useState} from 'react'
import OrderDetail from './OrderDetail';
import DeliveryAddressInfoCard from './DeliveryAddressInfoCard';
import CustomerSizeInfoCard from './CustomerSizeInfoCard';
import OrderInfoSideBar from './OrderInfoSideBar';
import { useNavigate } from 'react-router-dom';

const OrderInformation = (props) => {
    const { order, shop, client, onCodeChange, userRequest } = props;
    console.log("Client Size id",client.size)
    // console.log("User Request",userRequest)
    const navigate = useNavigate();

    const [orderInfo, setOrder] = useState(order);
    const [clientInfo, setClient] = useState(client);
    const [userRequestInfo, setUserRequest] = useState(userRequest)
    const handleClientChange = (key, value) => {
        setClient({
          ...clientInfo,
          [key]: value
        });
      };
    
      const handleOrderChange = (key, value) => {
        setOrder({
          ...orderInfo,
          [key]: value
        });
      };

      const handleUserRequestChange = (key, value) => {
        setUserRequest((prevUserRequestInfo) => ({
          ...prevUserRequestInfo,
          [key]: value
        }));
        console.log("UserRequestInfo",userRequestInfo)
      };
    
      const handleSubmit = async () => {
        // This is where you handle the submission (e.g., send data to an API)
        
        const formData = new FormData()

        let token = localStorage.getItem("x-access-token");
        if (!token) {
          alert("No access token found. Please log in.");
          return;
        }
        console.log("userRequestInfo Image",userRequestInfo.userRequestDescription.referenceImage)
        if (userRequestInfo.referenceImage) formData.append('image', userRequestInfo.userRequestDescription.referenceImage)
        // Add additional required fields like shopId and orderType
        formData.append('shopId', shop.shopId); // Add shop ID
        formData.append('orderType', orderInfo.name); // Add order type
        // const requestData = {
        //   shopId: shop.shopId, // Assuming `shop._id` contains the shop ID
        //   orderType: orderInfo.name, // Assuming orderInfo contains an `orderType` or similar field
        //   userRequestDescription: {
        //     clothType: userRequestInfo.clothType, // Assuming `clothType` is part of `userRequestInfo`
        //     budgetStart: userRequestInfo.budgetStart,
        //     budgetStop: userRequestInfo.budgetStop,
        //     deadline: userRequestInfo.deadline, // Assuming deadline is a string like '15 Oct 2024'
        //     // referenceImage: userRequestInfo.referenceImage || [] // Assuming `referenceImage` is an array
        //   },
          
        // };
        // Append userInfo properties to formData
        Object.entries(userRequestInfo).forEach(([key, value]) => {
          if(key !== 'referenceImage'){
            if(key === 'userRequestDescription'){
              formData.append(key, JSON.stringify(value))
            }
            else{
              formData.append(key, value)
            }
            
          } 
          console.log("key",key)
        })
        console.log("clothType", userRequestInfo.clothType)
        console.log("referenceimage", userRequestInfo.referenceImage)
        console.log("Submitting data:", formData);

        try{
          const response = await fetch('http://localhost:5555/createOrder', {
            method: "POST",
            headers:{
              "x-access-token": token,
            },
            body:  formData, // Use formData as the body
          });
          if(!response.ok){
            throw new Error('Failed to submit order. Please try again')
          }
          else if(response.ok){
            alert('Order sucessfully created');
            navigate('/');
          }
          const result = await response.json();
          console.log("Order successfully created", result);
        }catch(error){
          console.error('Error submitting order:', error);
          alert('There was an error submitting your order. Please try again.');
        }
        // You can make an API call here
      };
    return (
        <div className='flex justify-center'>
            <div className='mt-2 flex flex-col'>
                <div className='mb-8'>
                    View Shop{' > '}Shop{' > '}Detail
                </div>
                <div className='flex flex-col md:flex-row gap-x-10'>
                    <div className='flex flex-col w-auto md:w-4/5'>

                        <DeliveryAddressInfoCard 
                            client_name={client.fullname}
                            client_phone={client.phone}
                            client_address={client.address}
                            onChange={handleClientChange}                        
                        />
                        <CustomerSizeInfoCard 
                            size={client.size}
                            onChange={handleClientChange}       
                        />
                        <OrderDetail
                          userRequest={userRequestInfo}
                          onRequestChange={handleUserRequestChange}
                        /> 
                    </div>
                    <div>
                    <OrderInfoSideBar shop={shop} order={order} userRequest={userRequestInfo} onCodeChange={onCodeChange} onSendRequest={handleSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInformation
