import React from 'react';

function SingleButton(props) {
    return (<button className={`w-full ${ props.bg_color } hover:bg-red-500 hover:text-white ${ props.text_color } border py-2 px-4 rounded mt-5`}>
            {props.button1}
        </button>
    );
}

function DoubleButton(props) {
    return (<div className='flex flex-col'>
        <button className={`w-full bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded mt-3 lg:mt-5 ${ props.disable ? "opacity-50 cursor-not-allowed" : "" }`}>
          {props.button1}
        </button>
        <button className="w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-3">
          {props.button2}
        </button>
    </div>
    );
}

function Button(props) {
    const orderStatus = props.orderStatus;
    switch(orderStatus) {
        case "Pending":
            return <DoubleButton button1="Pending" button2="Cancel" disable={true}/>;
        case "Payment":
            return <DoubleButton button1="Confirm Payment" button2="Cancel" disable={false}/>;
        case "In Progress":
            return <SingleButton button1="Cancel" bg_color="bg-white" text_color="text-red-500" disable={false}/>;
        case "Due Dated":
            return <DoubleButton button1="Expand" button2="Refund" disable={false}/>;
        case "Delivered":
            return <DoubleButton button1="Accept" button2="Report" disable={false}/>;
        case "Complete-Not Review":
            return <SingleButton button1="Review" bg_color="bg-red-700" text_color="text-white" disable={false}/>;
        default:
          return <div></div>;
    }
}

function OrderSideBar(props) {
    const shop = props.shop;
    const order = props.order;
    const shopTagList = shop.tag.map((tag) =>
        <p className='mr-3'>{tag}</p>
    )

    const handleStatusColor = (orderStatus) => {
        const reds = ["Cancel", "Due Dated", "Rejected"];
        if (reds.includes(orderStatus)) {
            return "text-red-500";
        } else if (["Delivered", "Complete-Not Review", "Complete-Review"].includes(orderStatus)) {
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
        <div className='bg-white p-10 md:w-[480px] rounded-lg shadow-2xl'>
            <div className='flex gap-x-5 mb-3 flex-col sm:flex-row'>
                <img
                    src="https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain"
                    alt="profile.jpg"
                    className="w-24 h-24 lg:w-32 lg:h-32"
                />
                <div>
                    <h4 className='font-bold text-2xl mb-2'>{shop.name}</h4>
                    <p className={`${handleStatusColor(order.status)}`}>{order.status}</p>
                </div>
            </div>
            <div className='mb-3'>
                <h5 className='text-xl mb-2'>Description</h5>
                <div className='flex text-base text-gray-400 mb-1'>
                    {shopTagList}
                </div>
                <p className='text-xs lg:text-sm'>{shop.description}</p>
            </div>
            <div className='mb-4'>
                <h5 className='text-xl mb-2'>Code</h5>
                <div className="flex items-center border border-gray-300 rounded-xl w-full h-10 px-5 mb-4 lg:mb-0">
                    <p>{order.code}</p>
                </div>
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
            <div>
                <Button orderStatus={order.status} />
            </div>
        </div>
    );
};

export default OrderSideBar;
