import React, {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import NavbarClient from '../components/NavbarClient'
import NavbarShop from '../components/NavbarShop'
import NavbarAdmin from '../components/NavbarAdmin'
import Filterbar from '@/components/FilterBar'
import Shopcard from '@/components/ShopCard'
import myImage from '../../public/website_picture.png'; // Assuming your component is in src/components
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom'

const HomePage = () => {
  const centerdiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,432px)',
  }
  const [allshop, setAllshop] = useState([]);
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
      genre: "Cosplay",
    },
  ]);

  // Fetch Orders
  useEffect(() => {
    async function fetchShops() {
      try {
        const response = await fetch('http://localhost:5555/shop/shopdata'); // Replace with shop API endpoint
        const data = await response.json();
        console.log(data)
        setAllshop(data)
        setShop(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }

    fetchShops();
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
    if (role === "client"){
      NavbarComponent = NavbarClient;
    }
    else if (role === "shop"){
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
          shopRating="3.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"
          genre="Wedding"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Read this is gay"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"
          genre="Cosplay"/>

          <Shopcard previewImage="https://i.imgur.com/SjjJVdY.png"
          shopProfile="https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg"
          shopName="Hinoshii is cool"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget="2100"
          stopBudget="999999"
          genre="Cosplay"/>
          
          


        </div>
        <div style={centerdiv} className="justify-center w-[90vw] m-auto z-1">

          {allshop.length > 0 ? (
          allshop.map((result) => {
              // Check if any of the required fields are empty
              
              if (!result.shopName || !result.imageProfile || !result.shopDescription) {
                return null; // Skip this shop if any of the fields are empty
              }

              return (
                <Link to={`/viewshop/${result.id}`} state={{shopId: result._id}}> 
                  <Shopcard 
                  previewImage={result.previewImage}
                  verifyStatus={result.isVerified} 
                  shopProfile={result.imageProfile}
                  shopName={result.shopName}
                  shopRating={result.shopRating}
                  reviewCount={result.reviewCount}
                  shopDescription={result.shopDescription}
                  startBudget={result.startBudget}
                  stopBudget={result.stopBudget}
                  genre={result.genre}
                  />
                  <p>ShopId:{result._id}</p>
                </Link>
              );
            })
          ) : (
            <p>No Shop found</p>
          )}
        </div>

      </div>
      
    </div>
  )
}

export default HomePage
