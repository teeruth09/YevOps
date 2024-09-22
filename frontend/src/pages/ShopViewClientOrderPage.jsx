import NavbarShop from "@/components/NavbarShop";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrderInformation from "@/components/OrderInformation";
import ShopViewOrderInformation from "@/components/ShopViewOrderInformation";

const ShopViewClientOrderPage = () => {
  const location = useLocation(); // Hook to get the location object
  const [order, setOrder] = useState({
    name: "Basic",
    price: "3000",
    detail:
      "The basic pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in",
    deadline: "14",
  });

  const [shop, setShop] = useState({
    name: "Nai_mam dotshop",
    img: "https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain",
  });

  const [client, setClient] = useState({
    fullname: "นายสมศักดิ์ รัตนเกียรติภูมิชัยกุล",
    phone: "08x-123-4567",
    address: "123/342 ศรีนครินทร์ 43 ประเวศ ประเวศ กรุงเทพ 10250",
    size: "ขนาดตัวของ สมชาย",
  });

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
        onCodeChage={handleOrderChage}
      />
    </div>
  );
};

export default ShopViewClientOrderPage;
