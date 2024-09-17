import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import NavbarClient from '../components/NavbarClient'
import OrderInformation from '@/components/OrderInformation'

const OrderInformationPage = () => {
    const location = useLocation(); // Hook to get the location object
    const [order, setOrder] = useState({
      name: "Basic",
      price: "3000",
      detail: "The basic pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in",
      deadline: "14"
    });

    const [shop, setShop] = useState({ 
      name: "Nai_mama dotshop", 
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
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
      payment: ["VISA Kasikornbank [Default] *5199", "VISA Kasikornbank [Default] *4321"]
    });

    const handleOrderChage = (e) => {
      setOrder({
          ...order,
          [e.target.name]: e.target.value,
      });
    };

    return (
        <div>
            <NavbarClient/>
            <OrderInformation shop={shop} client={client} order={order} onCodeChage={handleOrderChage}/>

        
        </div>
    )
}

export default OrderInformationPage
