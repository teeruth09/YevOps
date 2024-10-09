import React ,{useState, useEffect} from 'react'
import PostOrderCard from './PostOrderCard';
import RequestOrderCard from './RequestOrderCard';
import { Link } from 'react-router-dom';

const ShopOrderRequestHistory = () => {

  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([
    {
      id: 1, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Waiting",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "หาร้านตัดชุดสูทสำหรับงานราตรี",
    },
    {
      id: 2, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://cdn.shopify.com/s/files/1/0255/9282/3901/products/long-sleeves-lace-ribbon-ball-gown-wedding-dresses-382_525x700.jpg?v=1630018154",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Payment",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดชุดแต่งงาน",
    },
    {
      id: 3, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://cf.shopee.co.th/file/896f2256f6c75569aa9eebecfd6bac4f",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "In Progress",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดชุดราชการ",
    },
    {
      id: 4, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://th.bing.com/th/id/OIP.mYdospDTpRkpsL7LjRLzawHaJQ?rs=1&pid=ImgDetMain",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Canceled",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดชุดครุยสำหรับงานวันรับปริญญา",
    },
    {
      id: 5, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://down-th.img.susercontent.com/file/th-11134207-7r992-ls2e8b3c2ldpea",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Sending",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดเสื้อช็อป",
    },
    {
      id: 6, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://th.bing.com/th/id/OIP.AOI6miYAmpmX7fOFcGfH6AHaHa?rs=1&pid=ImgDetMain",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Due Dated",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดชุดสูทสำหรับออกงานทางการ",
    },
    {
      id: 7, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://filebroker-cdn.lazada.co.th/kf/S1c5d8fabf6ff4b99839bcb934cbf2ae8X.jpg",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Complete",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดชุดไทยประยุกต์",
    },
    {
      id: 8, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://phahurat.com/wp-content/uploads/2020/04/spd_20160317143718_b.jpg",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "Delivered",
      price: "100.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดชุดราชปะแตน",
    },
    {
      id: 9, // Add an ID for easier identification
      firstname: "Teeruth",
      order_picture: "https://http2.mlstatic.com/D_Q_NP_2X_969086-MLV75894582829_042024-V.webp",
      imageProfile:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain",
      createAt: "15 Aug 2024",
      deadline: "20 Aug 2024",
      status: "New Request",
      price: "1000.00 THB",
      orderType: "Basic",
      order_detail: "ตามหาร้านตัดชุด Demon Slayer",
    },
  ]); // Array to store fetched orders

  const tabs = ["All", "New Request", "In Progress", "Success", "Late","Canceled"];

  useEffect(() => {
    async function fetchShopOrdersRequest() {
      const token = localStorage.getItem("x-access-token");
      try {
        const response = await fetch("http://localhost:5555/requestsOrder",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }); // Replace with your API endpoint
        const data = await response.json();
        console.log("Order",data)
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }

    fetchShopOrdersRequest();
  }, []);

  const filteredOrders = activeTab === 'All' ? orders : orders.filter((order) => {
    if (activeTab === 'In Progress'){
        return order.status === 'In Progress' || order.status === 'Sending';
    }else if(activeTab === 'Success'){
        return order.status === 'Complete' || order.status === 'Delivered' || order.status === 'Complete-Not Review'|| order.status === 'Complete-Review';
    }else if(activeTab === 'Late'){
        return order.status === 'Due Dated'
    }else if(activeTab === 'Canceled'){
        return order.status === 'Canceled';
    }else if(activeTab === 'New Request'){
        return order.status === 'New Request' || order.status === 'Pending';
    }else{
        return order.status === 'Waiting' || order.status === 'Payment';
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
          <Link key={order.id} to={`/shop/viewrequest/${order._id}`} state={{orderId: order._id}}>
            <RequestOrderCard key={order.id} orderInfo={order} />
          </Link>
        ))}
      </div>

    </div>
  )
}

export default ShopOrderRequestHistory
