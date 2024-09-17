import React from 'react'
import OrderDetail from './OrderDetail';
import DeliveryAddressInfoCard from './DeliveryAddressInfoCard';
import CustomerSizeInfoCard from './CustomerSizeInfoCard';
import OrderInfoSideBar from './OrderInfoSideBar';

const OrderInformation = (props) => {
    const order = props.order;
    const shop = props.shop;
    const client = props.client;
    const onCodeChange = props.onCodeChange;
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
                        />
                        <CustomerSizeInfoCard 
                            size={client.size}
                        />
                        <OrderDetail/> 
                    </div>
                    <div>
                    <OrderInfoSideBar shop={shop} order={order} onCodeChange={onCodeChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInformation
