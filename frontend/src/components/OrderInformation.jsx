import React, {useState} from 'react'
import OrderDetail from './OrderDetail';
import DeliveryAddressInfoCard from './DeliveryAddressInfoCard';
import CustomerSizeInfoCard from './CustomerSizeInfoCard';
import OrderInfoSideBar from './OrderInfoSideBar';

const OrderInformation = (props) => {
    const { order: initialOrder, shop, client: initialClient, onCodeChange } = props;

    const [order, setOrder] = useState(initialOrder);
    const [client, setClient] = useState(initialClient);
    const handleClientChange = (key, value) => {
        setClient({
          ...client,
          [key]: value
        });
      };
    
      const handleOrderChange = (key, value) => {
        setOrder({
          ...order,
          [key]: value
        });
      };
    
      const handleSubmit = () => {
        // This is where you handle the submission (e.g., send data to an API)
        const requestData = {
          order,
          client,
          shop,
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
                        <OrderDetail/> 
                    </div>
                    <div>
                    <OrderInfoSideBar shop={shop} order={order} onCodeChange={onCodeChange} onSendRequest={handleSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInformation
