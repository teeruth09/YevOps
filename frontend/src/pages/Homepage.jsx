import React, {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import NavbarClient from '../components/NavbarClient'
import NavbarShop from '../components/NavbarShop'
import NavbarAdmin from '../components/NavbarAdmin'
import Filterbar from '@/components/FilterBar'
import Shopcard from '@/components/ShopCard'
import myImage from '../../public/website_picture.png'; // Assuming your component is in src/components
import { jwtDecode } from "jwt-decode";


const HomePage = () => {
  const centerdiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,432px)',
  }

  const [shops, setShop] = useState([
    // Dummy data (Fetched array of data from db)
    {
      id: 1, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://i.imgur.com/SjjJVdY.png",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "Hinoshii is cool",
      shopRating: "5.0",
      reviewCount: "1384",
      shopDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startBudget: "2100",
      stopBudget: "999999",
    },
    {
      id: 2, // Add an ID for easier identification
      verifyStatus: "N",
      previewImage: "https://i.imgur.com/SjjJVdY.png",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "Bunny4Eva",
      shopRating: "3.8",
      reviewCount: "12",
      shopDescription: "I luv bnuy",
      startBudget: "1300",
      stopBudget: "4000",
    },
    {
      id: 3, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://m.media-amazon.com/images/I/61ILcasnX7L._AC_UF894,1000_QL80_.jpg",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "A",
      shopRating: "1.4",
      reviewCount: "14",
      shopDescription: "A quick brown",
      startBudget: "10000",
      stopBudget: "57000",
    },
    {
      id: 4, // Add an ID for easier identification
      verifyStatus: "N",
      previewImage: "https://i.imgur.com/SjjJVdY.png",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "Chamber Stupid",
      shopRating: "3.7",
      reviewCount: "1384",
      shopDescription: "book.",
      startBudget: "0",
      stopBudget: "100",
    },
    {
      id: 5, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription: "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },{
      id: 6, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription: "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },{
      id: 7, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription: "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },{
      id: 8, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription: "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },{
      id: 9, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile: "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription: "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },
  ]);

  // Fetch Orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/shop/shopdata'); // Replace with shop API endpoint
        const data = await response.json();
        setShop(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }

    fetchOrders();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let token = localStorage.getItem("x-access-token");
  console.log("token", token);
  let role = localStorage.getItem("role");
  console.log("role", role);

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

  let NavbarComponent;
  if (isAuthenticated) {
    if (role === "user"){
      NavbarComponent = NavbarClient;
    }
    else if (role === "online shop"){
      NavbarComponent = NavbarShop;
    }
  } else {
    NavbarComponent = Navbar;
  }

  return (
    <div>
      {/* Navbar */}
      <NavbarComponent/>

      <div className='flex flex-col items-center'>
        {/* Landing pic */}
        <img className='w-auto h-auto my-10' src={myImage} alt="" />
        

        {/* Filterbar */}
        <Filterbar/>

        {/* Placing cards  */}
        <div style={centerdiv} className="justify-center w-[90vw] m-auto z-1">
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Read this is gay"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Never gonna give"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          
          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"/>
          

        </div>
      </div>
      
    </div>
  )
}

export default HomePage



