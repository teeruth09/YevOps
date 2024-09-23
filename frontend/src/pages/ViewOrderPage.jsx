import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import NavbarClient from "@/components/NavbarClient";
import ViewOrder from "@/components/ViewOrder";

const ViewOrderPage = () => {
  const location = useLocation(); // Hook to get the location object

  const {orderId} = location.state || {};
  // console.log("OrderId",orderId)

  const [order, setOrder] = useState({
    status: location.state?.orderId.status || "In Progress",
    name: location.state?.orderId.name || "Basic", // Map orderType to name
    code: location.state?.orderId.code || "9ARMS",
    detail: location.state?.orderId.detail || "The basic pack...",
    total: location.state?.orderId.total || 500,
    discount: location.state?.orderId.discount || 100,
    fee: location.state?.orderId.fee || 20,
    pay:
      (location.state?.orderId.total || 500) -
      (location.state?.orderId.discount || 100) +
      (location.state?.orderId.fee || 20),
  });

  const [shop, setShop] = useState({
    shopName: "Nai_mama dotshop",
    shopDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    imageProfile: "https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain",
    tag: ["Basic", "Cosplay"],
    confirmDeadline: "17 Sep 2024",
    confirmPrice: 2000,
  });

  const [client, setClient] = useState({
    fullname: "นายสมศักดิ์ รัตนเกียรติภูมิชัยกุล",
    phone: "08x-123-4567",
    address: "123/342 ศรีนครินทร์ 43 ประเวศ ประเวศ กรุงเทพ 10250",
    size: "ขนาดตัวของ สมชาย",
    payment: [
      "VISA Kasikornbank [Default] *5199",
      "VISA Kasikornbank [Default] *4321",
    ],
  });


  useEffect(() =>{
    const fetchOrderDetail = async () =>{
      try{
        const response = await fetch(`http://localhost:5555/order/orderdetail/${orderId}`,{
          method: "GET",
        });
        const data = await response.json();

        setClient({
          fullname: data.clientId.firstname+' '+data.clientId.lastname,
          phone: data.clientId.phone,
          address: data.clientId.address,
          size: data.clientSize,
        });
        setShop({
          shopName: data.shopId.shopName,
          shopDescription: data.shopId.shopDescription,
          imageProfile: data.shopId.imageProfile,

        })
        setOrder({
          status: data.status,
          name: data.orderType,

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
  }, []);  


  const handleOrderChage = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-screen">
      <NavbarClient />
      <ViewOrder
        shop={shop}
        client={client}
        order={order}
        onCodeChage={handleOrderChage}
      />
    </div>
  );
};

export default ViewOrderPage;