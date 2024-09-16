import React, { useState } from 'react'
import NavbarClient from '@/components/NavbarClient';
import ReportReviewSideBar from '@/components/ReportReviewSideBar';
import OrderCard from '@/components/OrderCard';
import { Link } from 'react-router-dom';
import ReportReviewForm from '@/components/ReportReviewForm';

function ReportPage() {
    const [order, setOrder] = useState({
        id: 1, // Add an ID for easier identification
        shop_name: "The Sewing shop",
        order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
        shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
        order_date: "15 Aug 2024",
        due_date: "20 Aug 2024",
        order_status: "Pending",
        price: "100.00 THB",
        type_order: "Basic",
        order_detail: "รับตัดชุทสูททุกชนิด",
    });

  return (
    <div>
        <NavbarClient/>
        <div className='flex justify-center px-4 lg:px-10'>
            <div className='mt-2 flex flex-col'>
                <div className='mb-8'>
                    Order{' > '}{order.shop_name}{' > '}Report
                </div>
                <div className='flex flex-col lg:flex-row gap-x-10'>
                    <div className='flex flex-col'>
                        <div>
                            <h1 className='font-bold text-xl mb-5'>Report Product</h1>
                            <Link key={order.id} to={`/order/${order.id}`}>
                                <OrderCard key={order.id} orderInfo={order} /> 
                            </Link>
                        </div>
                        <div className='mb-8'>
                            <h2 className='text-lg mb-5'>Reason to Report:</h2>
                            <ReportReviewForm />
                        </div>
                    </div>
                    <ReportReviewSideBar/>
                </div>
                </div>
        </div>
    </div>
  )
}

export default ReportPage
