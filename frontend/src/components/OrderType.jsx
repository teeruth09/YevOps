import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrderType = ({shopId}) => {
  const [orderTypes, setOrderTypes] = useState([
    {
        shopId: 1, // Add an ID for easier identification
        name: "Basikkk",
        price: "3000",
        detail: "The basic pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in",
        deadline: "14"
    },{
      shopId: 1, // Add an ID for easier identification
      name: "Advanced",
      price: "6000",
      detail: "The Advanced pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in but yeah i think this only 144 chars long so i'll add a little more \n \n \n \n asdasd",
      deadline: "21"
    },{
      shopId: 1, // Add an ID for easier identification
      name: "Superbbb",
      price: "12000",
      detail: "The lorem asdljfklasdjfklajsdklfjaksldfjklasdjfl able to fit in but yeah i think this only 144 chars long so i'll add a little more \n- try1 \n- try2\n- try3\n asdasd",
      deadline: "28"
    }
  ]);
  let token = localStorage.getItem("x-access-token");
  let role = localStorage.getItem("role");
  const navigate = useNavigate();


  const maxOrderType = orderTypes.length;
  const [viewPackage, setViewPackage] = useState(0);

  const packageClick = (index) => {
    setViewPackage(index); // Update the state with the index of the clicked button
  };

  const handleOrder = () => {
    if(!token){
      alert("Please log in before order product")
    }
    else{
      if(role === 'client'){
        navigate('/order/information', {state: {sendShopId: shopId }}); //pass shopId
      }
    }
  }

  // Fetch shop's Order type (1-3)
  useEffect(() => {
    async function fetchOrders() {
        try {
            const response = await fetch('/api/shop/shopOrderType/shopId'); // Replace with shop API endpoint
            const data = await response.json();
            setShop(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    }
    
    fetchOrders();
  }, []);

    return (
      <div className='w-[500px] border-[1px]'>
        <div className='flex flex-row justify-around items-center w-full h-[60px]'>
          {orderTypes.map((orderType,index) => (
            <button key={index} onClick={() => packageClick(index)} className='border-[1px] w-full h-full flex items-center justify-center text-xl font-medium hover:bg-gray-200'><p>{orderType.name}</p></button>
          ))}
        </div>
      
        {
          viewPackage == 0 &&
          <div className='flex flex-col items-center'>
            <div className='flex flex-row w-full justify-between px-10'>
              <p className='text-2xl font-medium pt-6'>{orderTypes[0].name}</p>
              <p className='text-3xl font-medium pt-5'>{orderTypes[0].price} THB</p>
            </div>
            <div className='w-full flex flex-row items-center justify-start pt-10 pl-10'>
              <FaClock size={20}/>
              <p className='text-xl font-bold pl-1'>{orderTypes[0].deadline} Days</p>
            </div>
            <p style={{ whiteSpace: 'pre-line' }} className='text-l font-medium pt-5 px-10 text-gray-700'>{orderTypes[0].detail}</p>
            <button className='my-10 w-[90%] h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700' onClick={handleOrder}>
              Order Now
            </button>
          </div>
        }
        {
          viewPackage == 1 &&
          <div className='flex flex-col items-center'>
            <div className='flex flex-row w-full justify-between px-10'>
              <p className='text-2xl font-medium pt-6'>{orderTypes[1].name}</p>
              <p className='text-3xl font-medium pt-5'>{orderTypes[1].price} THB</p>
            </div>
            <div className='w-full flex flex-row items-center justify-start pt-10 pl-10'>
              <FaClock size={20}/>
              <p className='text-xl font-bold pl-1'>{orderTypes[1].deadline} Days</p>
            </div>
            <p style={{ whiteSpace: 'pre-line' }} className='text-l font-medium pt-5 px-10 text-gray-700'>{orderTypes[1].detail}</p>
            <button className='my-10 w-[90%] h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700' onClick={handleOrder}>
              Order Now
            </button>
          </div>
        }
        {
          viewPackage == 2 &&
          <div className='flex flex-col items-center'>
            <div className='flex flex-row w-full justify-between px-10'>
              <p className='text-2xl font-medium pt-6'>{orderTypes[2].name}</p>
              <p className='text-3xl font-medium pt-5'>{orderTypes[2].price} THB</p>
            </div>
            <div className='w-full flex flex-row items-center justify-start pt-10 pl-10'>
              <FaClock size={20}/>
              <p className='text-xl font-bold pl-1'>{orderTypes[2].deadline} Days</p>
            </div>
            <p style={{ whiteSpace: 'pre-line' }} className='text-l font-medium pt-5 px-10 text-gray-700'>{orderTypes[2].detail}</p>
            <button className='my-10 w-[90%] h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700' onClick={handleOrder}>
              Order Now
            </button>
          </div>
        }

      </div>
    )
  }
  
  export default OrderType