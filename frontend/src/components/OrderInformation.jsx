import React, {useState} from 'react'
import OrderDetail from './OrderDetail';
import DeliveryAddressInfoCard from './DeliveryAddressInfoCard';
import CustomerSizeInfoCard from './CustomerSizeInfoCard';
import OrderInfoSideBar from './OrderInfoSideBar';

const OrderInformation = (props) => {
    const { order, shop, client, onCodeChange, userRequest } = props;
    console.log("Client Size id",client.size)
    // console.log("User Request",userRequest)

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
    
      const handleSubmit = () => {
        // This is where you handle the submission (e.g., send data to an API)
        const requestData = {
          order,
          client,
          shop,
          userRequestInfo
        };
    
        console.log("Submitting data:", requestData);
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
