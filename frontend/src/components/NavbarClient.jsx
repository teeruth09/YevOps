import React from 'react'
import { useState ,useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const NavbarClient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const [userInfo, setUserInfo] = useState({
        username: "Teeruth",
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZlMTM0ODIzZGRmOWVlMzUyMzIwNWExIiwiZW1haWwiOiJqYW5lLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcyNjExMTk5NywiZXhwIjoxNzI2MTE1NTk3fQ.ekWV-nzlzRb8Tqhs1vVfY0o7vdk43sxif4mqNvfHfuQ"
            const token = localStorage.getItem("x-access-token");

            try {
                const response = await fetch('http://localhost:5555/profile',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':token
                    }
                }); // Replace with your API endpoint               
                const data = await response.json();
                setUserInfo({
                    ...userInfo,
                    username: data.username,                  
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
    
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem("x-access-token");
        try {
        const response = await fetch('http://localhost:5555/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
            },
        });
    
        if (response.ok) {
            localStorage.removeItem('x-access-token'); // Clear token from localStorage
            console.log("Logout successfull");
            navigate('/',{replace: true});
            // Force reload if on the home page
            if (window.location.pathname === '/') {
                window.location.reload();
            }
        } else {
            console.error('Logout failed');
        }
        } catch (error) {
        console.error('Logout error:', error);
        }
    };

    // Function to handle search submission
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        
        try {
        // Sending the search term to the backend API
        const response = await fetch(`http://localhost:5555/search?keyword=${searchTerm}`, {
            method: 'GET', // Change to 'POST' if your API expects a POST request
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                // Handle 404 error, navigate to a different endpoint or show a message
                console.error('Resource not found (404)');
                navigate(`/search?keyword=${searchTerm}`); // Example: Navigate to a custom error page
                return;
            } else {
                throw new Error('Search request failed');
            }
        }
        
        const result = await response.json();
        console.log('Search result:', result);
        console.log({ searchResults: result }); // Log the state being passed
        navigate(`/search?keyword=${searchTerm}`, {state: {searchResults: result}});
        
        // Do something with the result, like updating state or redirecting
        // Example: setSearchResults(result);
        } catch (error) {
        console.error('Error during search:', error);
        }
    };
  

    return (
        <nav className="bg-red-800 sticky top-0 z-10">
            <div className='mx-1 w-full px-2 sm:px-6 lg:px-8 '>
                <div className="relative flex h-16 items-center justify-between">
                    <div className="font-medium text-2xl text-white">
                        YevOps
                    </div>
                    <div className="relative pl-8 text-gray-600 ">
                        <form className="bg-white flex  rounded-xl h-10 px-5 pr-5 " onSubmit={handleSearchSubmit}>
                            <input 
                                type="search"
                                name="search"
                                placeholder='Search'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='text-sm focus:outline-none pr-5'
                            />    
                            <button
                                type="submit"
                                className="flex items-center whitespace-nowrap  py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-1 items-center  sm:items-stretch sm:justify-start ml-4 ">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className=" space-x-4">
                                <NavLink
                                exact
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                    ? "rounded-md bg-white px-5 py-2 text-sm font-medium text-black"
                                    : "rounded-md px-5 py-2 text-sm font-medium text-white hover:text-black"
                                }
                                >
                                Home
                                </NavLink>
                                <NavLink
                                to="/post"
                                className={({ isActive }) =>
                                    isActive
                                    ? "rounded-md bg-white px-5 py-2 text-sm font-medium text-black"
                                    : "rounded-md px-5 py-2 text-sm font-medium text-white hover:text-black"
                                }
                                >
                                Create Post
                                </NavLink>
                                <NavLink
                                to="/applyshop"
                                className={({ isActive }) =>
                                    isActive
                                    ? "rounded-md bg-white px-5 py-2 text-sm font-medium text-black"
                                    : "rounded-md px-5 py-2 text-sm font-medium text-white hover:text-black"
                                }
                                >
                                ApplyShop
                                </NavLink>
                            </div>
                            
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                        <div className="flex items-center space-x-7">
                        <div className="font-medium  text-white">
                            {userInfo.username}
                        </div>
                        <FaUserCircle size={50} onClick={toggleDropdown} className="cursor-pointer " />

                            {isDropdownOpen && (

                            <div className="absolute right-0 z-10  mt-36 w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                            <NavLink to="/client/profile" className="block px-4 py-2 text-sm text-gray-700 flex items-center">
                                <IoEyeOutline size={30} />
                                <div className='text-base px-10'>Profile</div>
                            </NavLink>
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-sm text-gray-700 flex items-center"
                                onClick={handleLogout}
                            >
                                <IoIosLogOut size={30}/>
                                <div className='text-base px-10'>Logout</div>
                            </NavLink>

                            </div>
                            </div>
                            )}
                    
                        </div>
                    </div>  
                </div>
            </div>
        
        </nav>
    )
}

export default NavbarClient
