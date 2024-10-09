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
import { Link } from 'react-router-dom';

function AdminViewShop() {
    const [verificationRequests, setVerificationRequest] = useState({
        address: "378/34 กาญจะนะคนดี ดอกไม้ กุหลาบ 12344 กรุงเทพมหานคร",
        worker: 12,
        sewer: 3,
        maxClient: 20,
        ownerName: "นายจิงเกอเบล ฮี่ฮี่ๆๆ",
        phone: "0123456789",
        image: "example.jpg"
    })

    const mockImages = [
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
                address: data.address
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

  return (
    <div>
      <Navbar />
        <div className='flex flex-col w-full p-6 gap-4 '>
          
          <p className='text-sm ml-32'>View Shop &gt; Shop</p>

          <div className='grid md:grid-cols-2 md:ml-32'>
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
            <div className='md:ml-20'>
              <div className='w-full md:w-[480px] h-fit px-[30px] py-[40px] shadow-xl rounded-md'>
                <div>
                    <h2 className='font-bold text-xl'>Verification Requested</h2>
                    { verificationRequests?
                        <Link to="">
                            <div className='flex relative items-center w-full h-fit px-[15px] py-[20px] shadow-xl bg-gray-100 mt-3'>
                                <p className='text-lg font-semibold'>View Request</p>
                                <div className='absolute right-4'>
                                    <img className='w-[24px] h-[24px]' src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="" />
                                </div>
                            </div>
                        </Link>
                     : <p className='font-light ml-6 my-10'>No Verification Request</p>}
                    

                </div>
                <div>
                    <Link to={""}>
                        <button className={`w-full bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded-xl mt-3 lg:mt-5`}>
                            Ban
                        </button>
                    </Link>
                    <Link to={""}>
                        <button className="w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded-xl mt-3">
                            Delete
                        </button>
                    </Link>
                </div>
              </div>
              <div className='w-full md:w-[480px] h-fit px-[30px] py-[40px] shadow-xl rounded-md mt-10'>
                <h3 className='font-semibold text-xl mb-10'>History</h3>
                <div className='h-[250px] overflow-x-hidden overflow-y-auto' >
                    <div className='flex gap-[6px] text-lg'>
                        <p className='text-gray-400'>02/03/24</p>
                        <p className='text-gray-400'>10:35</p>
                        <p className='text-red-600 font-semibold'>Teeruth.213</p>
                        <p>ส่งคำขอ</p>
                        <p className='text-red-400 font-semibold'>Standard</p>
                    </div>
                    <div className='flex gap-[6px] text-lg'>
                        <p className='text-gray-400'>02/03/24</p>
                        <p className='text-gray-400'>10:35</p>
                        <p>ส่งอนุมัติ</p>
                        <p className='text-red-400 font-semibold'>Standard</p>
                        <p className='text-red-600 font-semibold'>Teeruth.213</p>
                    </div>
                    <div className='flex gap-[6px] text-lg'>
                        <p className='text-gray-400'>02/03/24</p>
                        <p className='text-gray-400'>10:35</p>
                        <p className='text-red-600 font-semibold'>Teeruth.213</p>
                        <p>ส่งคำขอ</p>
                        <p className='text-red-400 font-semibold'>Basic</p>
                    </div>
                    <div className='flex gap-[6px] text-lg'>
                        <p className='text-gray-400'>02/03/24</p>
                        <p className='text-gray-400'>10:35</p>
                        <p>ส่งอนุมัติ</p>
                        <p className='text-red-400 font-semibold'>Basic</p>
                        <p className='text-red-600 font-semibold'>Teeruth.213</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdminViewShop
