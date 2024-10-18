import React, {useState,useEffect} from "react";
import { FaClock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ShopReply from "./ShopReply";

function SingleButton(props) {
  return (<Link to={props.to1}>
      <button 
          className={`w-full bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded mt-3 lg:mt-5 ${ props.disable ? "opacity-50 cursor-not-allowed" : "" }`}
              // onClick={!props.disable ? props.onClick : undefined} // Add onClick for button1
          onClick={!props.disable ? () => props.onClick1(props.button1) : undefined} // Pass button1 value
      >
          {props.button1}
      </button>
  </Link>
  );
}

function DoubleButton(props) {
  return (<div className='flex flex-col'>
      <Link to={props.to1}>
          <button 
              className={`w-full bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded mt-3 lg:mt-5 ${ props.disable ? "opacity-50 cursor-not-allowed" : "" }`}
              // onClick={!props.disable ? props.onClick : undefined} // Add onClick for button1
              onClick={!props.disable ? () => props.onClick1(props.button1) : undefined} // Pass button1 value
              >
              {props.button1}
          </button>
      </Link>
      <Link to={props.to2}>
          <button 
              className="w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-3"
              // onClick={!props.disable ? props.onClick : undefined} // Add onClick for button1
              onClick={() => props.onClick2(props.button2) } // Pass button2 value
              >
              {props.button2}
          </button>
      </Link>
  </div>
  );
}

function Button(props) {
  const orderStatus = props.orderStatus;
  const orderId = props.orderId; // Ensure orderId is passed
  const confirmDeadline = props.confirmDeadline;
  const confirmPrice = props.confirmPrice;

  console.log("confirmDeadline:",confirmDeadline);
  console.log("confirmPrice:",confirmPrice);

  useEffect(() => {
      console.log('Hellogkaokogkeoko orderId in parent component:', orderId);
  }, [orderId]);

  const handleSubmitStatus = async (buttonValue, orderId) => {
      let orderStatus;
      if (buttonValue === "Accept") {
          orderStatus = "Payment"; // or the appropriate status
      }else if(buttonValue === "Reject") {
          orderStatus = "Rejected"; // handle cancel action
      }else if(buttonValue === 'Shipped'){
          orderStatus = 'Sending';
      }else if(buttonValue === 'Complete'){
          orderStatus = 'Delivered';
      }
      // Add more conditions as necessary based on your button values

      const token = localStorage.getItem("x-access-token");
      try {
          const response = await fetch('http://localhost:5555/manageOrder', {  // Replace with your backend API endpoint
              method: 'PATCH',  // or 'PUT', depending on your use case
              headers: {
                  'Content-Type': 'application/json',
                  "x-access-token": token,
              },
              body: JSON.stringify({
                  orderid: orderId,  // Ensure you have the order ID or other necessary data
                  status: orderStatus,
                  shopReplyDescription:{
                    confirmDeadline: confirmDeadline,
                    confirmPrice: confirmPrice,
                  }
              }),
          });

          if (!response.ok) {
              throw new Error('Failed to update status');
          }

          const result = await response.json();
          console.log('Status updated successfully:', result);

      } catch (error) {
          console.error('Error updating status:', error);
      }

      if (!orderId) {
          console.error('orderId is undefined when submitting status');
          return; // Prevent submission if orderId is not valid
      }

      console.log(`Submit Status of orderId:${orderId}`, orderStatus);
      console.log("confirmDeadline:",confirmDeadline);
      console.log("confirmPrice:",confirmPrice);
  };

  switch(orderStatus) {
      case "Pending":
          return <DoubleButton button1="Accept" button2="Reject" to1="/shop/profile/order" to2="/shop/profile/order" disable={false} 
                  onClick1={(value) => handleSubmitStatus(value, orderId)} // Pass value from button1
                  onClick2={(value) => handleSubmitStatus(value, orderId)}/>;

      case "In Progress":
          return <SingleButton button1="Shipped" to1="/shop/profile/order" disable={false} 
                  onClick1={(value) => handleSubmitStatus(value, orderId)} // Pass value from button1
                  />;
      case "Sending":
          return <SingleButton button1="Complete" to1="/shop/profile/order" disable={false} 
                  onClick1={(value) => handleSubmitStatus(value, orderId)} // Pass value from button1
                  />;
      default:
        return <div></div>;
  }
}

const ShopOrderInfoSidebar = ({ client, order, onSendRequest,orderId,confirmDeadline,confirmPrice}) => {
  // const shop = props.shop;
  // const order = props.order;
  console.log("ShopOrderInfoSidebar  orderId",orderId)
  // console.log("confirmDeadline",confirmDeadline)
  // console.log("confirmPrice",confirmPrice)

  const getStatusColor = (status) => {
    switch (status) {
        case 'Waiting':
            return 'text-gray-500';
        case 'New Request':
            return 'text-sky-500';
        case 'Pending':
            return 'text-sky-500';
        case 'Payment':
            return 'text-indigo-500';
        case 'In Progress':
            return 'text-yellow-500	'
        case 'Canceled':
            return 'text-red-500';
        case 'Rejected':
            return 'text-red-500';
        case 'Sending':
            return 'text-yellow-500';
        case 'Due Dated':
            return 'text-red-500';
        case 'Complete':
            return 'text-green-500';
        case 'Complete-Review':
            return 'text-green-500';
        case 'Complete-Not Review':
            return 'text-green-500';
        case 'Delivered':
            return 'text-green-500';
        default:
            return ''; // Or a fallback color if needed
    }
  };

  return (
    <div className="bg-white p-10 md:w-[480px] h-fit rounded-lg shadow-2xl">
      <div className="flex gap-x-5 mb-3 flex-col sm:flex-row">
        <img
          src={client.imageProfile}
          alt="profile.jpg"
          className="w-24 h-24 lg:w-32 lg:h-32"
        />
        <div>
          <h4 className="font-bold text-2xl mb-2">{client.fullname}</h4>
          <p className={`font-bold ${getStatusColor(order.status)}`}>
             {order.status === 'Pending' ? 'New Request' : order.status}
          </p>        
        </div>
      </div>
      <div className="mb-3">
        <h5 className="text-xl mb-2">Description</h5>
        <div className="flex flex-row w-full justify-between ">
          <p className="text-gray-400 font-medium pt-6">{order.name}</p>
          <p className="font-medium pt-5">{order.price} THB</p>
        </div>
        <div className="w-full flex flex-row items-center justify-start pt-5">
          <FaClock size={15} />
          <p className="font-medium pl-1">{order.deadline} Days</p>
        </div>
        <p
          style={{ whiteSpace: "pre-line" }}
          className="text-l  pt-5  text-gray-700"
        >
          {order.detail}
        </p>
      </div>
      <div className="mb-3">
        {/* <button
          className={
            "w-full bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded mt-3 lg:mt-5"
          }
          onClick={onSendRequest} // Trigger the parent’s handleSubmit
        >
          Accept
        </button>
        <button className="w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-3">
          Reject
        </button> */}
        <div>
          <Button orderStatus={order.status} orderId={orderId} confirmDeadline={confirmDeadline} confirmPrice={confirmPrice} onClick={() => {}}/>
        </div>
      </div>
    </div>
  );
};

export default ShopOrderInfoSidebar;
