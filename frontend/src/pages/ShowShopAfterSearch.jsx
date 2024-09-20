import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import NavbarClient from '../components/NavbarClient'
import NavbarShop from '../components/NavbarShop'
import NavbarAdmin from '../components/NavbarAdmin'
import Shopcard from '../components/ShopCard'
import Filterbar from '../components/FilterBar'
import { jwtDecode } from "jwt-decode";
import { useLocation } from 'react-router-dom'


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
      </div>

      
      {searchResults.length > 0 ? (
      searchResults.map((result, index) => (
        <div key={index}>
          <p>Shop Name: {result.shopName}</p>
          <p>Shop shopProfile: {result.shopProfile}</p>
          <p>Shop previewImage: {result.previewImage}</p>
          <p>Shop shopRating: {result.shopRating}</p>
          <p>Shop Description: {result.shopDescription}</p>
          <p>Shop startBudget: {result.startBudget}</p>
          <p>Shop stopBudget: {result.stopBudget}</p>
        </div>
      ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  )
}

export default Aftersearch