import React, { useState, useEffect } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { RxSlash } from "react-icons/rx";

const ShopEditProfile = () => {

    const [userInfo, setUserInfo] = useState({
        username: "The Sewing Shop",
        shop_profile: "https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
        shopname: "The Sewing Shop",
        phone_number: "xxxxxxxxxx",
        address: "911/2 Ladkrabang",
        province: "Bangkok",
        district: "Ladkrabang",
        zip_code: "10520",
        shop_description:"รับตัดชุดสูท ชุด Cosplay การันตีสินค้าคุณภาพ",
        shop_location: "https://www.bing.com/maps/geoplat/REST/v1/Imagery/Map/RoadVibrant/13.723014,100.749996/13?ms=648,345&heid=7862906125874626561,707070&fpp=13.723013877868652,100.74999618530273;178&ml=Basemap,LandCover,Landmarks,OsmBuildings&key=AnTcaqBi2ypp0xI-OZNi4W_ik2KhjgpqioTAtXLC8GzkMBQRMlyxvxyTnd5b73im&c=en-US&fmt=jpeg&od=1&shading=hill&logo=n&da=ro",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/user'); // Replace with your API endpoint
                const data = await response.json();
                setUserInfo({
                    ...userInfo,
                    username: data.username,
                    shopname: data.shopname,
                    phone_number: data.phone_number,
                    address: data.address,
                    province: data.province,
                    district: data.district,
                    zip_code: data.zip_code,
                    shop_description: data.shop_description,
                    shop_location: data.shop_location,
                                 
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
    
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Optionally, you can reset the changes here if needed
    };
    const handleSaveClick = () => {
        //update profile
    };
 
    return (
        <div className="px-5 lg:px-20">
            <div className="py-3 text-3xl font-semibold mb-4">Profile</div>
            <div className="w-full lg:w-auto h-full bg-white shadow-xl p-5 lg:p-10">
                <div className="Profiledetail">
                    <div className="flex flex-col lg:flex-row">
                        <img
                            src={userInfo.shop_profile}
                            alt="profile.jpg"
                            className="w-32 h-32 lg:w-48 lg:h-48"
                        />
                        <div className="pt-5 lg:pt-0 lg:pl-5">
                            <div className="text-2xl font-bold">{userInfo.username}</div>
                            <div className="flex flex-col lg:flex-row">
                                <div className="name">
                                    <p>Shop Name</p>
                                    <input
                                        name="username"
                                        type="text"
                                        value={userInfo.shopname}
                                        className="border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                
                            </div>
                            <div className="flex flex-col lg:flex-row pt-3">
                                <div className="mb-4 lg:mb-0">
                                    <p>Phone Number</p>
                                    <input
                                        name="phonenumber"
                                        type="text"
                                        value={userInfo.phone_number}
                                        className="border border-gray-300 rounded-xl h-10 px-5"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6">
                        <p>Home No, Room No, Apartment/Village Name, Sub-District </p>
                        <input
                            name="address"
                            type="text"
                            value={userInfo.address}
                            className="border border-gray-300 rounded-xl h-10 w-full px-5"
                        />
                        <div className="flex flex-col lg:flex-row pt-3">
                            <div className="w-full mb-4 lg:mb-0">
                                <p>Province</p>
                                <input
                                    name="province"
                                    type="text"
                                    value={userInfo.province}
                                    className="border border-gray-300 rounded-xl h-10 w-full px-5"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="lg:pl-10 w-full mb-4 lg:mb-0">
                                <p>District</p>
                                <input
                                    name="district"
                                    type="text"
                                    value={userInfo.district}
                                    className="border border-gray-300 rounded-xl h-10 w-full px-5"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="lg:pl-10 w-full">
                                <p>Zip Code</p>
                                <input
                                    name="zipcode"
                                    type="text"
                                    value={userInfo.zip_code}
                                    className="border border-gray-300 rounded-xl h-10 w-full px-5"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <p>Shop Description</p>
                        
                        <textarea
                            name="shop_description"
                            value={userInfo.shop_description}
                            className="border border-gray-300 rounded-xl h-20 w-full pb-9 px-2 "
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="pt-4">
                        {!isEditing ? (
                            <div>

                                <p>Shop Location</p>
                                <img
                                    src={userInfo.shop_location}
                                    alt="location.jpg"
                                    className="w-full h-full"
                                />
                            </div>

                        ):(
                            <div>
                            <div className='flex items-center'>
                                <p>Shop Location</p>
                                <FiPlusCircle size={25} className='px-1'/>
                                <RxSlash/>
                                <div class="items-center mt-1 px-1">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                                <p>Use same location as address</p>

                            </div>

                                <img
                                    src={userInfo.shop_location}
                                    alt="location.jpg"
                                    className="w-full h-full"
                                />
                            </div>                
                        )}
    
                    </div>
                  
                    <div className="flex flex-col lg:flex-row pt-10 items-center">
                        <div className='flex-1'></div>
                        {!isEditing ? (
                                <button
                                    onClick={handleEditClick}
                                    className="w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded"
                                >
                                    Edit
                                </button>
                            ) : (
                                <div>
                                    <button
                                        onClick={handleCancelClick}
                                        className="w-full lg:w-40 bg-white hover:bg-gray-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-2 lg:mt-0 lg:ml-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveClick}
                                        className="ml-3 w-full lg:w-40 bg-red-500 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopEditProfile;
