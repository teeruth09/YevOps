import React, { useState } from 'react';
import NavbarClient from '../components/Navbar';
import ViewOrder from '@/components/ViewOrder';

const ViewOrderPage = () => {
    const [order, setOrder] = useState({
      status: "Pending",
      code: "9ARMS",
      total: 500,
      discount: 100,
      fee: 20,
      pay: 500-100+20
    });
    const [shop, setShop] = useState({ 
        name: "Nai_mama dotshop", 
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
        img: "https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain",
        tag: ["Basic", "Cosplay"]
    });
    const [client, setClient] = useState({
      fullname: "นายสมศักดิ์ รัตนเกียรติภูมิชัยกุล",
      phone: "08x-123-4567",
      address: "123/342 ศรีนครินทร์ 43 ประเวศ ประเวศ กรุงเทพ 10250",
      size: "ขนาดตัวของ สมชาย"
    });

  return (
    <div className='w-screen'>
        <NavbarClient/>
        <ViewOrder shop={shop} client={client} order={order} />
    </div>
  );
}

export default ViewOrderPage;
