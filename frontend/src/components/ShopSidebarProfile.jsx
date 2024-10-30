import React, {useState, useEffect} from 'react';
import { FaFolder, FaHeart, FaHistory, FaEdit, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { BsBank2 } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const ShopSidebar = () => {

    const [userInfo, setUserInfo] = useState({
        username: "Teeruth",
    });
    useEffect(() => {
        async function fetchUserData() {
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
            // navigate('/',{replace: true});
            
        } else {
            console.error('Logout failed');
        }
        } catch (error) {
        console.error('Logout error:', error);
        }
    };

    return (
        <div className="w-64 h-full bg-white shadow-lg p-5 fixed z-10">
            <h2 className="text-xl mb-6 font-bold">{userInfo.username}</h2>
            <hr className="border-t border-gray-300" />
            <div className="space-y-10">
                <NavLink to="/shop/profile/post">
                    <div className="flex items-center space-x-3 py-4">
                        <FaEdit className="text-gray-600" size={20} />
                        <span className="text-gray-700">Edit Shop</span>
                    </div>
                </NavLink>
                <NavLink to="/shop/profile/reviews">
                    <div className="flex items-center space-x-3 py-4">
                        <FaHeart className="text-gray-600" size={20} />
                        <span className="text-gray-700">Review History</span>
                    </div>
                </NavLink>
                <NavLink to="/shop/profile/order">
                    <div className="flex items-center space-x-3 py-4">
                        <FaHistory className="text-gray-600" size={20} />
                        <span className="text-gray-700">Order History</span>
                    </div>
                </NavLink>
                <hr className="border-t border-gray-300" />
                <NavLink to="/shop/profile">
                    <div className="flex items-center space-x-3 py-4">
                        <FaEdit className="text-gray-600" size={20} />
                        <span className="text-gray-700">Edit Profile</span>
                    </div>
                </NavLink>
                <NavLink to="/shop/profile/bank">
                    <div className="flex items-center space-x-3 py-4">
                        <BsBank2 className="text-gray-600" size={20} />
                        <span className="text-gray-700">Bank Account</span>
                    </div>
                </NavLink>
                <NavLink to="/shop/profile/password">
                    <div className="flex items-center space-x-3 py-4">
                        <FaLock className="text-gray-600" size={20} />
                        <span className="text-gray-700">Change Password</span>
                    </div>
                </NavLink>
                <hr className="border-t border-gray-300" />
                <NavLink to="/" onClick={handleLogout}>
                    <div className="flex items-center space-x-3 py-4">
                        <FaSignOutAlt className="text-red-600" size={20} />
                        <span className="text-red-600">Log Out</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default ShopSidebar;