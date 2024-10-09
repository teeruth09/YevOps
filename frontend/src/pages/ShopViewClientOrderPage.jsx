import NavbarShop from "@/components/NavbarShop";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrderInformation from "@/components/OrderInformation";
import ShopViewOrderInformation from "@/components/ShopViewOrderInformation";

const ShopViewClientOrderPage = () => {
  const location = useLocation(); // Hook to get the location object

  const {orderId} = location.state || {};

  console.log("OrderId in ShopViewClientOrderPage",orderId)

  if (!orderId) {
    console.error('Order ID is undefined');
    return <div>Error: Order ID is missing.</div>;
  }

  const [order, setOrder] = useState({
    status: "New Request",
    name: "Basic",
    price: "3000",
    detail:
      "The basic pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in",
    deadline: "14",

  });

  const [shop, setShop] = useState({
    shopName: "Nai_mama dotshop",
    imageProfile: "https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain",
    confirmDeadline: "17 Sep 2024",
    confirmPrice: 200,
  });

  const [client, setClient] = useState({
    fullname: "นายสมศักดิ์ รัตนเกียรติภูมิชัยกุล",
    phone: "08x-123-4567",
    address: "123/342 ศรีนครินทร์ 43 ประเวศ ประเวศ กรุงเทพ 10250",
    size: "ขนาดตัวของ สมชาย",
    imageProfile: "",
  });

  const [userRequest, setUserRequest] = useState({
    clothType: "",
    budgetStart: '',
    budgetStop: '',
    deadline: '',
    referenceImage: [],
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() =>{
    const fetchOrderDetail = async () =>{
      if (!orderId) {
        console.error("Order ID is undefined.");
        return;
      }
      try{
        const response = await fetch(`http://localhost:5555/order/orderdetail/${orderId}`,{
          method: "GET",
        });
        const data = await response.json();
        // console.log("Get orderDetail",data)
        setClient({
          fullname: data.clientId.firstname+' '+data.clientId.lastname,
          phone: data.clientId.phone,
          address: data.clientId.address,
          size: data.clientSize,
          imageProfile: data.clientId.imageProfile,
        });
        setShop({
          shopName: data.shopId.shopName,
          shopDescription: data.shopId.shopDescription,
          imageProfile: data.shopId.imageProfile,
          confirmDeadline: formatDate(data.deadline),
          confirmPrice: data.userRequestDescription.budgetStart,

        })
        setOrder({
          status: data.status,
          name: data.orderType,
          price: data.price
        })
        setUserRequest({
          clothType: data.userRequestDescription.clothType,
          budgetStart: data.userRequestDescription.budgetStart,
          budgetStop: data.userRequestDescription.budgetStop,
          deadline: formatDate(data.deadline),
          referenceImage: data.userRequestDescription.referenceImage,
        })

        if (response.ok){
          console.log("Order Id Detail:",data);
          // setShopDetail(data)
        }else{
          console.log("Fail to fetch shop",data)
        }
      }catch(error){
        console.error("Error fetch shop info:", error); 
      }
    }
    fetchOrderDetail();
  }, [orderId]);//Add orderId as a dependency


  const handleOrderChage = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <NavbarShop />
      <div className="flex pl-5 pt-5"></div>
      <ShopViewOrderInformation
        shop={shop}
        client={client}
        order={order}
        userRequest={userRequest}
        onCodeChage={handleOrderChage}
        orderId={orderId}
      />
    </div>
  );
};

export default ShopViewClientOrderPage;
