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
      due_date: "20 Aug 2024",
      order_status: "Pending",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 2, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "Payment",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 3, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "In Progress",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 4, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "Canceled",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 5, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "Sending",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 6, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "Due Dated",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 7, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "Complete",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 8, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "Rejected",
      price: "100.00 THB",
      type_order: "Basic",
      order_detail: "รับตัดชุทสูททุกชนิด",
    },
    {
      id: 9, // Add an ID for easier identification
      shop_name: "The Sewing shop",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      shop_profile:"https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      order_date: "15 Aug 2024",
      due_date: "20 Aug 2024",
      order_status: "Delivered",
      price: "100.00 THB",
      type_order: "Basic",
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
      return order.order_status === 'In Progress' || order.order_status === 'Sending';
    }else if(activeTab === 'Success'){
      return order.order_status === 'Complete' || order.order_status === 'Delivered';
    }else if(activeTab === 'Failed'){
      return order.order_status === 'Due Dated' || order.order_status === 'Rejected' || order.order_status === 'Canceled';
    }else{
      return order.order_status === 'Pending' || order.order_status === 'Payment';
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
          <Link key={order.id} to={`/order/${order.id}`}>
            <OrderCard key={order.id} orderInfo={order} /> 
          </Link>
        ))}
      </div>

    </div>
  )
}

export default ClientPurchaseHistory
