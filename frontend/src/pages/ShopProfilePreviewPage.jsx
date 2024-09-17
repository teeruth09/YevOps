import React, {useEffect,useState} from 'react'
import NavbarShop from '@/components/NavbarShop'
import ShopSidebar from '@/components/ShopSidebarProfile'
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import OrderType from '@/components/OrderType';

const ShopProfilePreviewPage = () => {
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
            price: "3000",
            detail: "The Advanced pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in but yeah i think this only 144 chars long so i'll add a little more \n \n \n \n asdasd",
            deadline: "21"
        }
    ]);
    
    const OrderTypeCount = orderTypes.length;
    const [buttonCount, setButtonCounts] = useState(OrderTypeCount);
    
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
    
  const bt2Clicked = () => {
    setButtonCounts(2);
  };

  const bt3Clicked = () => {
    setButtonCounts(3); 
  };

  return (
    <div>
        <NavbarShop/>
        <div className='flex pl-5 pt-5'>
            <ShopSidebar/>
            <div className='grid justify-start pl-[300px] w-[calc((100vw-19rem))]'>
                {/* Shop Preview Image */}
                <div className='w-[500px] flex flex-col'>
                    <div className='w-full h-[80px] flex justify-start items-center border-b'>
                        <p className='text-2xl font-semibold'>
                            Shop Preview Image
                        </p>
                    </div>
                    <div className='w-full h-[300px] flex flex-col pt-3'>
                        <p className='mb-3'>Upload your preview image here!</p>
                        <div className='w-full h-5/6 bg-gray-200 flex justify-center items-center'>
                            Input Image Zone
                        </div>
                    </div>
                </div>

                {/* Shop Ordertype */}
                <div className='w-[500px] flex flex-col'>
                    <div className='w-full h-[80px] flex justify-start items-center border-b'>
                        <p className='text-2xl font-semibold'>
                            Order Package Settings
                        </p>
                    </div>
                    <div className='w-full flex flex-col pt-3'>
                        <p className='mb-8'>Setting up your details here!</p>

                        {
                            buttonCount >=0 &&
                            <div className='pl-5'>
                                <p className='mb-6 border-b text-xl'>First Package</p>
                                <div className='my-3 mr-3 w-3/5'><TextField defaultValue={orderTypes[0]?.name || ""} required label="Package Name (4-10 characters)" fullWidth slotProps={{ minLength: 1, maxLength: 10 }}/></div>
                                <div className='flex flex-row'>
                                    <div className='my-3 mr-3 w-2/5'><TextField defaultValue={orderTypes[0]?.price || ""} required label="Price (THB)" fullWidth /></div>
                                    <div className='my-3 mr-3 w-2/5'><TextField defaultValue={orderTypes[0]?.deadline || ""} required label="Working time (days)" fullWidth /></div>
                                </div>
                                <div className='my-3 mr-3 w-full'><TextField defaultValue={orderTypes[0]?.detail || ""} required label="Product Details" fullWidth multiline /></div>
                            </div>
                        }
                        {
                            buttonCount >= 2 &&
                            <div className='pl-5 pt-5'>
                                <p className='mb-6 border-b text-xl'>Second Package</p>
                                <div className='my-3 mr-3 w-3/5'><TextField defaultValue={orderTypes[1]?.name || ""} required label="Package Name (4-10 characters)" fullWidth slotProps={{ minLength: 1, maxLength: 10 }}/></div>
                                <div className='flex flex-row'>
                                    <div className='my-3 mr-3 w-2/5'><TextField defaultValue={orderTypes[1]?.price || ""} required label="Price (THB)" fullWidth /></div>
                                    <div className='my-3 mr-3 w-2/5'><TextField defaultValue={orderTypes[1]?.deadline || ""} required label="Working time (days)" fullWidth /></div>
                                </div>
                                <div className='my-3 mr-3 w-full'><TextField defaultValue={orderTypes[1]?.detail || ""} required label="Product Details" fullWidth multiline /></div>
                            </div>
                        }
                        {
                            buttonCount >= 3 &&
                            <div className='pl-5 pt-5'>
                                <p className='mb-6 border-b text-xl'>Third Package</p>
                                <div className='my-3 mr-3 w-3/5'><TextField defaultValue={orderTypes[2]?.name || ""} required label="Package Name (4-10 characters)" fullWidth slotProps={{ minLength: 1, maxLength: 10 }}/></div>
                                <div className='flex flex-row'>
                                    <div className='my-3 mr-3 w-2/5'><TextField defaultValue={orderTypes[2]?.price || ""} required label="Price (THB)" fullWidth /></div>
                                    <div className='my-3 mr-3 w-2/5'><TextField defaultValue={orderTypes[2]?.deadline || ""} required label="Working time (days)" fullWidth /></div>
                                </div>
                                <div className='my-3 mr-3 w-full'><TextField defaultValue={orderTypes[2]?.detail || ""} required label="Product Details" fullWidth multiline /></div>
                            </div>
                        }
                        {
                            (buttonCount == 1 || buttonCount == 0) &&
                            <button onClick={bt2Clicked} className='mt-4 border-[1px] h-10 shadow-lg font-medium rounded-lg hover:bg-gray-300'>
                                Add Second Package
                            </button>
                        }
                        {
                            buttonCount == 2 &&
                            <button onClick={bt3Clicked} className='mt-4 border-[1px] h-10 shadow-lg font-medium rounded-lg hover:bg-gray-300'>
                                Add Third Package
                            </button>
                        }
                        <div className='flex flex-row justify-start pl-5 pt-5 mb-10'>
                            <button className='w-24 h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700'>
                                Save
                            </button>
                            <button className='ml-10 w-24 h-10 border-[1px] shadow-xl bg-white text-black text-xl font-medium flex items-center justify-center rounded-lg hover:bg-gray-200'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShopProfilePreviewPage