import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import NavbarClient from '../components/NavbarClient'
import OrderInformation from '@/components/OrderInformation'

const OrderInformationPage = () => {
    const location = useLocation(); // Hook to get the location object

    // Access the state passed via `navigate`
    const { sendShopId } = location.state || {};

    const [order, setOrder] = useState({
      name: "Basic",
      price: "3000",
      detail: "The basic pack, low detail cosplay and i write this to test if the message is like 400 charecters long will it able to fit in",
      deadline: "14"
    });

    const [shop, setShopInfo] = useState({ 
      shopName: "Nai_mama dotshop", 
      imageProfile: "",
    });

    const [client, setClientInfo] = useState({
      fullname: "นายสมศักดิ์ รัตนเกียรติภูมิชัยกุล",
      phone: "08x-123-4567",
      address: "123/342 ศรีนครินทร์ 43 ประเวศ ประเวศ กรุงเทพ 10250",
      size: "ขนาดตัวของ สมชาย",
    });


    useEffect(() => {
      async function fetchClientData(){
        const token = localStorage.getItem("x-access-token");
        try{
          const response = await fetch('http://localhost:5555/profile',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':token
            }
          }); // Replace with your API endpoint
          // Log raw response text
          const data = await response.json();
          setClientInfo({
            fullname: `${data.firstname} ${data.lastname}`,
            phone: data.phone,
            address: data.address,
            size: data.size,
          })
          // console.log("ClientInfo",data)
        }catch(error){
          console.error("Failed to fetch user data:", error);
        }
      }
      fetchClientData();
    }, []);
    

    useEffect(() =>{
      const fetchShopProfile = async () =>{
        try{
          const response = await fetch(`http://localhost:5555/shop/shopdata/${sendShopId}`,{
            method: "GET",
          });
          const data = await response.json();
          setShopInfo({
            shopName: data.shopName,
            imageProfile: data.imageProfile,
            previewImage: data.previewImage,
          })
          if (response.ok){
            console.log("Shop Profile:",data);
            // setShopInfo(data)
          }else{
            console.log("Fail to fetch shop",data)
          }
        }catch(error){
          console.error("Error fetch shop info:", error); 
        }
      }
      fetchShopProfile();
  }, []);  



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
