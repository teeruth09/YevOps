import React from 'react'
import BillingInfoCard from './BillingInfoCard';
import CustomerInfoCard from './CustomerInfoCard';
import OrderSideBar from './OrderSideBar';

function ViewOrder(props) {
    const order = props.order;
    const shop = props.shop;
    const client = props.client;

    return (
        <div className='flex justify-center'>
            <div className='w-4/5 mt-2'>
                <div className='mb-8'>
                    Order{' > '}{shop.name}
                </div>
                <div className='flex flex-col md:flex-row gap-x-10 justify-center'>
                    <div className='flex flex-col w-auto md:w-3/5'>
                        <BillingInfoCard 
                            client_name={client.fullname}
                            client_phone={client.phone}
                            client_address={client.address}
                        />
                        <CustomerInfoCard 
                            address={client.address}
                            size={client.size}
                        />
                    </div>
                    <OrderSideBar shop={shop} order={order}/>
                </div>
                </div>
        </div>
    );
};

export default ViewOrder;
