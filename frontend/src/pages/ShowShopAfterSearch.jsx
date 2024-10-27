import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import NavbarClient from '../components/NavbarClient'
import NavbarShop from '../components/NavbarShop'
import NavbarAdmin from '../components/NavbarAdmin'
import Shopcard from '../components/ShopCard'
import Filterbar from '../components/FilterBar'
import { jwtDecode } from "jwt-decode";
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Aftersearch = () => {
  const centerdiv = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,432px)',
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  let token = localStorage.getItem("x-access-token");
  let role = localStorage.getItem("role");
  // console.log('Location state:', location.state.searchResults);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const term = queryParams.get('keyword');
    setSearchTerm(term || '');

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

    //Set the search results from location state
    if (location.state?.searchResults){
      setSearchResults(location.state.searchResults);
    } else {
      console.error('No search results found in location state');
    }
  }, [token, location.state]);

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
    <div className='relative'>
      {/* Navbar */}
      <NavbarComponent/>

      {/* Display search query */}
      <p className='text-4xl font-bold pl-10 pt-8 pb-8'>Result for "{searchTerm}"</p>
      {/* The filter bar */}
      <Filterbar/>
      {/* Placing cards  */}
      <div style={centerdiv} className="justify-center w-[90vw] m-auto z-1">
       
      {searchResults.length > 0 ? (
      searchResults.map((result, index) => {
        // if (!result.shopName || !result.imageProfile || !result.shopDescription || !result.orderTypeIds) {
        //   return null; // Skip this shop if any of the fields are empty
        // }
          return (
          <div key={index}>  
            <Link to={`/viewshop/${result._id}`} state={{ shopId: result._id }}> 
              <Shopcard
                shopId={result._id}
                previewImage={result.previewImage}
                verifyStatus={result.isVerified} 
                shopProfile={result.imageProfile}
                shopName={result.shopName}
                shopRating={result.shopRating}
                reviewCount={result.reviewCount}
                shopDescription={result.shopDescription}
                startBudget={result.orderTypeIds[0]}
                stopBudget={result.stopBudget}
                genre={result.genre}
              />
            </Link>
          </div>
          );
        })
      ) : (
        <div className='items-center'>
          <p className='text-5xl mx-11 items-center font-bold'>No shop found</p>
          <div className="bg-gray-300 p-1 mt-2"> 
          <img src="https://thumbs.dreamstime.com/b/no-trade-icon-trading-booth-ban-there-commercial-equipment-prohibition-vector-271448154.jpg" alt="" className='w-full h-[300px]  '/>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Aftersearch