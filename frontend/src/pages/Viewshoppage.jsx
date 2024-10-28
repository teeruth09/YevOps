import Navbar from '../components/Navbar'
import { FaStar } from 'react-icons/fa6'

import ShopCarousel from '@/components/view-shop/ShopCarousel'
import {
  CommentCard,
  MainDetailCard,
  ReviewCard,
} from '@/components/view-shop/DetailCards'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OrderType from '@/components/OrderType'
import { jwtDecode } from "jwt-decode";
import NavbarClient from '@/components/NavbarClient'


const Viewshoppage = () => {
  const mockImages = [
    'mock-products/hitman-suit.png',
    'mock-products/wedding-dress.png',
    'mock-products/shop-preview.png',
    'login-background.png',
    'profile.png',
  ]
  const location = useLocation();
  const {shopId} = location.state || {};
  const [shopDetail, setShopDetail] = useState({
    location: "",
    registerDate: "",
    isVerified: false,
    shopName: "",
    imageProfile: "",
    shopDescription: "",
    previewImage: [],
    phone: "",
    address: "",
    orderTypeIds: [],
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
 
  console.log("ShopId:",shopId)

  useEffect(() =>{
      const fetchShopProfile = async () =>{
        try{
          const response = await fetch(`http://localhost:5555/shop/shopdata/${shopId}`,{
            method: "GET",
          });
          const data = await response.json();
          setShopDetail({
            ...shopDetail,
            location: data.location,
            registerDate: data.registerDate,
            isVerified: data.isVerified,
            shopName: data.shopName,
            imageProfile: data.imageProfile,
            shopDescription: data.shopDescription,
            previewImage: data.previewImage,
            phone: data.phone,
            address: data.address,
            orderTypeIds: data.orderTypeIds,
          })
          if (response.ok){
            console.log("Shop Profile:",data);
            setShopDetail(data)
          }else{
            console.log("Fail to fetch shop",data)
          }
        }catch(error){
          console.error("Error fetch shop info:", error); 
        }
      }
      fetchShopProfile();
  }, []);  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let token = localStorage.getItem("x-access-token");
  let role = localStorage.getItem("role");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
    else{
      setIsAuthenticated(false);
    }
  }, [token]);
  
  return (
    <div>
        <div className='flex flex-col w-full p-6 gap-4 '>
          
          <p className='text-sm ml-32'>View Shop &gt; Shop</p>

          <div className='grid grid-cols-2 ml-32'>
            <div className='flex flex-col gap-2'>
              
              <div className='flex w-full gap-2 items-center'>
                <img
                  src={shopDetail.imageProfile}
                  alt='profile'
                  className='w-12 h-12 rounded-full'
                />
                <p className='text-xl font-bold mx-2'>{shopDetail.shopName}</p>
                <FaStar />
                <p className='text-sm'>5.0 (37)</p>
              </div>
              
              <ShopCarousel imageUrls={mockImages} />

              <MainDetailCard address={shopDetail.address} phone={shopDetail.phone} registerDate={formatDate(shopDetail.registerDate)} shopDescription={shopDetail.shopDescription}/>

              <ReviewCard
                oneStarReviewers={0}
                twoStarsReviewers={0}
                threeStarsReviewers={5}
                fourStarsReviewers={10}
                fiveStarsReviewers={15}
                numberOfAllReviewers={30}
              />

              <CommentCard />
            </div>
            <div className='ml-20'>
              <OrderType shopId={shopId} orderTypeIds={shopDetail.orderTypeIds}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Viewshoppage
