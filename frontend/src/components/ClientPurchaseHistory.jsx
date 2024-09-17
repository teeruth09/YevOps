import React ,{useState, useEffect} from 'react'
import OrderCard from './OrderCard'
import { Link } from 'react-router-dom';

const ClientPurchaseHistory = () => {

  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([
    {
      id: 1, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Pending",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 2, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Payment",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 3, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "In Progress",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 4, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Canceled",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 5, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Sending",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 6, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Due Dated",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 7, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Complete-Not Review",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 8, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Rejected",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 9, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Delivered",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
  ]); // Array to store fetched orders

  const tabs = ["All", "Success", "In Progress", "Failed", "Other"];

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/user/orders'); // Replace with your API endpoint
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }

    fetchOrders();
  }, []);

  const filteredOrders = activeTab === 'All' ? orders : orders.filter((order) => {
    if (activeTab === 'In Progress'){
      return order.status === 'In Progress' || order.status === 'Sending';
    }else if(activeTab === 'Success'){
      return order.status === 'Complete-Not Review'|| order.status === 'Complete-Review' || order.status === 'Complete' || order.status === 'Delivered';
    }else if(activeTab === 'Failed'){
      return order.status === 'Due Dated' || order.status === 'Rejected' || order.status === 'Canceled';
    }else{
      return order.status === 'Pending' || order.status === 'Payment';
    }
    });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex border-b h-full bg-white shadow-xl rounded-lg my-5 justify-center">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-8 py-2 focus:outline-none ${
                        activeTab === tab
                            ? "text-black border-b-2 border-red-600"
                            : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </button>
            ))}
      </div>
      <div className='pt-1'>
        {filteredOrders.map((order) => (
          <Link key={order.id} to={`/order/${order.id}`} state={{order}}>
            <OrderCard key={order.id} orderInfo={order} /> 
          </Link>
        ))}
      </div>

    </div>
  )
}

export default ClientPurchaseHistory
