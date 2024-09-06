import React, {useState, useEffect} from 'react';
import { FaFolder, FaHeart, FaHistory, FaEdit, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { BsBank2 } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const ClientSidebar = () => {

    const [userInfo, setUserInfo] = useState({
        username: "Teeruth",
    });
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/user'); // Replace with your API endpoint
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

    return (
        <div className="w-64 h-full bg-white shadow-lg p-5">
            <h2 className="text-xl font-semibold mb-6 font-bold">{userInfo.username}</h2>
            <hr className="border-t border-gray-300" />
            <div className="space-y-10">
                <NavLink to="/client/profile/post">
                    <div className="flex items-center space-x-3 py-4">
                        <FaFolder className="text-gray-600" size={20} />
                        <span className="text-gray-700">My Post</span>
                    </div>
                </NavLink>
                <NavLink to="/client/profile/favorites">
                    <div className="flex items-center space-x-3 py-4">
                        <FaHeart className="text-gray-600" size={20} />
                        <span className="text-gray-700">My Favorite Shop</span>
                    </div>
                </NavLink>
                <NavLink to="/client/profile/history">
                    <div className="flex items-center space-x-3 py-4">
                        <FaHistory className="text-gray-600" size={20} />
                        <span className="text-gray-700">Purchase History</span>
                    </div>
                </NavLink>
                <hr className="border-t border-gray-300" />
                <NavLink to="/client/profile">
                    <div className="flex items-center space-x-3 py-4">
                        <FaEdit className="text-gray-600" size={20} />
                        <span className="text-gray-700">Edit Profile</span>
                    </div>
                </NavLink>
                <NavLink to="/client/profile/bank">
                    <div className="flex items-center space-x-3 py-4">
                        <BsBank2 className="text-gray-600" size={20} />
                        <span className="text-gray-700">Bank Account</span>
                    </div>
                </NavLink>
                <NavLink to="/client/profile/password">
                    <div className="flex items-center space-x-3 py-4">
                        <FaLock className="text-gray-600" size={20} />
                        <span className="text-gray-700">Change Password</span>
                    </div>
                </NavLink>
                <hr className="border-t border-gray-300" />
                <NavLink to="/">
                    <div className="flex items-center space-x-3 py-4">
                        <FaSignOutAlt className="text-red-600" size={20} />
                        <span className="text-red-600">Log Out</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default ClientSidebar;
