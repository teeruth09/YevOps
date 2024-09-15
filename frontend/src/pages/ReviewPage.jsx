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

    const [rating, setRating] = useState(null);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

  return (
    <div>
        <NavbarClient/>
        <div className='flex justify-center px-4 lg:px-10'>
            <div className='mt-2 flex flex-col'>
                <div className='mb-8'>
                    Order{' > '}{order.shop_name}{' > '}Review
                </div>
                <div className='flex flex-col lg:flex-row gap-x-10'>
                    <div className='flex flex-col'>
                        <div>
                            <h1 className='font-bold text-xl mb-5'>Rate Product</h1>
                            <Link key={order.id} to={`/order/${order.id}`}>
                                <OrderCard key={order.id} orderInfo={order} /> 
                            </Link>
                        </div>
                        <div className='mb-8'>
                            <div className='flex gap-x-10 items-center mb-5'>
                                <h2 className='font-semibold text-lg'>Product Quality</h2>
                                <div className="rating rating-lg rating-half">
                                    <input type="radio" name="rating-10" className="rating-hidden" value={0} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-400" value={0.5} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-400" value={1} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-400" value={1.5} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-400" value={2} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-400" value={2.5} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-400" value={3} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-400" value={3.5} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-400" value={4} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-400" value={4.5} onChange={handleRatingChange} />
                                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-400" value={5} onChange={handleRatingChange} />
                                </div>
                            </div>
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
