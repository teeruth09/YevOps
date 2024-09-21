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
  const [shopDetail, setShopDetail] = useState(null);

  console.log("ShopId:",shopId)

  useEffect(() =>{
      const fetchShopProfile = async () =>{
        try{
          const response = await fetch(`http://localhost:5555/shop/shopdata/${shopId}`,{
            method: "GET",
          });
          const data = await response.json();
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

  
  return (
    <div>
      <Navbar />

      <div className='flex flex-col w-full p-6 gap-4'>
        <p className='text-sm'>View Shop &gt; Shop</p>

        <div className='grid grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex w-full gap-2 items-center'>
              <img
                src='profile.png'
                alt='profile'
                className='w-12 h-12 rounded-full'
              />
              <p className='text-xl font-bold mx-2'>Nai_mana dotshop</p>
              <FaStar />
              <p className='text-sm'>5.0 (37)</p>
            </div>

            <ShopCarousel imageUrls={mockImages} />

            <MainDetailCard />

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
        </div>
      </div>
    </div>
  )
}

export default Viewshoppage
