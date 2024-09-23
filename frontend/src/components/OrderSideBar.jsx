import React from 'react';
import { Link } from 'react-router-dom';

function SingleButton(props) {
    return (<Link to={props.to1}>
        <button className={`w-full ${ props.bg_color } hover:bg-red-500 hover:text-white ${ props.text_color } border py-2 px-4 rounded mt-5`}>
            {props.button1}
        </button>
    </Link>
    );
}

function DoubleButton(props) {
    return (<div className='flex flex-col'>
        <Link to={props.to1}>
            <button className={`w-full bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded mt-3 lg:mt-5 ${ props.disable ? "opacity-50 cursor-not-allowed" : "" }`}>
                {props.button1}
            </button>
        </Link>
        <Link to={props.to2}>
            <button className="w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-3">
                {props.button2}
            </button>
        </Link>
    </div>
    );
}

function Button(props) {
    const orderStatus = props.orderStatus;
    switch(orderStatus) {
        case "Pending":
            return <DoubleButton button1="Pending" button2="Cancel" to1="" to2="/client/profile/history" disable={true}/>;
        case "Payment":
            return <DoubleButton button1="Confirm Payment" button2="Cancel" to1="" to2="/client/profile/history" disable={false}/>;
        case "In Progress":
            return <SingleButton button1="Cancel" bg_color="bg-white" to1="/client/profile/history" text_color="text-red-500" disable={false}/>;
        case "Due Dated":
            return <DoubleButton button1="Expand" button2="Refund" to1="" to2="" disable={false}/>;
        case "Delivered":
            return <DoubleButton button1="Accept" button2="Report" to1="" to2="/order/1/report" disable={false}/>;
        case "Complete-Not Review":
            return <SingleButton button1="Review" bg_color="bg-red-700" text_color="text-white" to1="/order/1/review" disable={false}/>;
        default:
          return <div></div>;
    }
}

function ShowPrice(props) {
    const order = props.order;
    const onCodeChange = props.onCodeChange;

    return (<div>
        <div className='mb-4'>
                <h5 className='text-xl mb-2'>Code</h5>
                <input
                    name="code"
                    type="text"
                    placeholder='Enter the code'
                    value={order.code}
                    className="border border-gray-300 rounded-xl w-full h-10 px-5 mb-4 lg:mb-0"
                    onChange={onCodeChange}
                    disabled={!(order.status === "Payment")}
                />
            </div>
            <div>
                <div className='flex justify-between'>
                    <p>Order Total</p>
                    <p>THB {order.total}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Promotion Code</p>
                    <p>THB {order.discount}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Service Fee</p>
                    <p>THB {order.fee}</p>
                </div>
                <div className='flex justify-between text-red-700'>
                    <p>You'll Pay</p>
                    <p>THB {order.pay}</p>
                </div>
            </div>
    </div>)
}

function OrderSideBar(props) {
    const shop = props.shop;
    const order = props.order;
    const onCodeChange = props.onCodeChange;

    const handleStatusColor = (orderStatus) => {
        const reds = ["Canceled", "Due Dated", "Rejected"];
        if (reds.includes(orderStatus)) {
            return "text-red-500";
        } else if (["Delivered", "Complete-Not Review", "Complete-Review", "Complete"].includes(orderStatus)) {
            return "text-green-500";
        } else if (["Sending", "In Progress"].includes(orderStatus)) {
            return "text-orange-300"
        } else if (["Payment"].includes(orderStatus)) {
            return "text-indigo-500"
        } else {
            return "text-gray-500"
        }
    }

    return (
        <div className='bg-white p-10 md:w-[480px] h-fit rounded-lg shadow-2xl'>
            <div className='flex gap-x-5 mb-3 flex-col sm:flex-row'>
                <img
                    src={shop.imageProfile}
                    alt="profile.jpg"
                    className="w-24 h-24 lg:w-32 lg:h-32"
                />
                <div>
                    <h4 className='font-bold text-2xl mb-2'>{shop.shopName}</h4>
                    <p className={`${handleStatusColor(order.status)}`}>{order.status}</p>
                </div>
            </div>
            <div className='mb-3'>
                <h5 className='text-xl mb-2'>Description</h5>
                <div className='flex text-base text-gray-400 mb-1'>
                    <p className='mr-3'>{order.name}</p>
                </div>
                <p className='text-xs lg:text-sm'>{order.detail}</p>
            </div>
            { !["Pending", "Rejected"].includes(order.status) && <ShowPrice order={order} onCodeChange={onCodeChange} /> }
            <div>
                <Button orderStatus={order.status} />
            </div>
        </div>
    );
};

export default OrderSideBar;
