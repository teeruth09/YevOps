import React from 'react'
import BillingInfoCard from './BillingInfoCard';
import CustomerInfoCard from './CustomerInfoCard';
import OrderSideBar from './OrderSideBar';
import PaymentMethodCard from './PaymentMethodCard';
import ShopReply from './ShopReply';
import Chat from './Chat';

function ViewOrder(props) {
    const order = props.order;
    const shop = props.shop;
    const client = props.client;
    const onCodeChange = props.onCodeChange;
    console.log(order.status)
    return (
        <div className='flex justify-center'>
            <div className='mt-2 flex flex-col'>
                <div className='mb-8'>
                    Order{' > '}{shop.name}
                </div>
                <div className='flex flex-col md:flex-row gap-x-10'>
                    <div className='flex flex-col w-auto md:w-4/5'>
                        {["Payment"].includes(order.status) && <ShopReply 
                          confirmDeadline = {shop.confirmDeadline}
                          confirmPrice = {shop.confirmPrice}
                        />}
                
                        <BillingInfoCard 
                            client_name={client.fullname}
                            client_phone={client.phone}
                            client_address={client.address}
                        />
                        <CustomerInfoCard 
                            address={client.address}
                            size={client.size}
                        />
                        {!["Pending", "Rejected", "Canceled"].includes(order.status) && <PaymentMethodCard payment={client.payment} />}
    
                    </div>
                    <div>
                    <OrderSideBar shop={shop} order={order} onCodeChange={onCodeChange}/>
                    <div className='mt-96 mb-5 ml-96'>
                        {["Due Dated", "Sending", "In Progress"].includes(order.status) && <Chat/>}
                    </div>
                    </div>
                </div>
                </div>
        </div>
    );
};

export default ViewOrder;
