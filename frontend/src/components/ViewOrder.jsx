import React from 'react'
import BillingInfoCard from './BillingInfoCard';
import CustomerInfoCard from './CustomerInfoCard';
import OrderSideBar from './OrderSideBar';
import PaymentMethodCard from './PaymentMethodCard';

function ViewOrder(props) {
    const order = props.order;
    const shop = props.shop;
    const client = props.client;
    const onCodeChange = props.onCodeChange;

    return (
        <div className='flex justify-center'>
            <div className='mt-2 flex flex-col'>
                <div className='mb-8'>
                    Order{' > '}{shop.name}
                </div>
                <div className='flex flex-col md:flex-row gap-x-10'>
                    <div className='flex flex-col w-auto md:w-4/5'>
                        <BillingInfoCard 
                            client_name={client.fullname}
                            client_phone={client.phone}
                            client_address={client.address}
                        />
                        <CustomerInfoCard 
                            address={client.address}
                            size={client.size}
                        />
                        {!["Pending", "Rejected"].includes(order.status) && <PaymentMethodCard payment={client.payment} />}
                    </div>
                    <OrderSideBar shop={shop} order={order} onCodeChange={onCodeChange}/>
                </div>
                </div>
        </div>
    );
};

export default ViewOrder;
