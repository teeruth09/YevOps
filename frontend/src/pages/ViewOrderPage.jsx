import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import NavbarClient from "@/components/NavbarClient";
import ViewOrder from "@/components/ViewOrder";

const ViewOrderPage = () => {
  const location = useLocation(); // Hook to get the location object
  const [order, setOrder] = useState({
    status: location.state?.order.status || "In Progress",
    name: location.state?.order.name || "Basic", // Map orderType to name
    code: location.state?.order.code || "9ARMS",
    detail: location.state?.order.detail || "The basic pack...",
    total: location.state?.order.total || 500,
    discount: location.state?.order.discount || 100,
    fee: location.state?.order.fee || 20,
    pay:
      (location.state?.order.total || 500) -
      (location.state?.order.discount || 100) +
      (location.state?.order.fee || 20),
  });

  const [shop, setShop] = useState({
    name: "Nai_mama dotshop",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain",
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
