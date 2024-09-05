import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
import { MdModeEdit } from "react-icons/md";


const ClientEditProfile = () => {

    // State to manage SelectItems
    const [selectItems, setSelectItems] = useState([
        { id: 'A', label: 'ขนาดตัวของนาย A' },
        { id: 'B', label: 'ขนาดตัวของนาย B' },
        { id: 'C', label: 'ขนาดตัวของนาย C' },
    ]);
    // State to track editing state (optional)
    const [editingIndex, setEditingIndex] = useState(null);
    const [newItemLabel, setNewItemLabel] = useState('');

    const [userInfo, setUserInfo] = useState({
        username: "Teeruth",
        firstname: "Teeruth",
        lastname: "Ieowsakulrat",
        date_of_birth: "2-Feb-2000",
        phone_number: "xxxxxxxxxx",
        gender: "Other",
        address: "911/2 Ladkrabang",
        province: "Bangkok",
        district: "Ladkrabang",
        zip_code: "10520",
        whose_size: "ขนาดตัวของคุณ",
        shirt_length: "45", //เสื้อยาว
        chest_size:"45", //รอบอก
        waistline: "45", //รอบเอว
        hip: "45", //สะโพก
        waist_shirt: "45", //เอวเสื้อ
        hip_shirt: "45", //สะโพกเสื้อ
        thigh: "45", //ต้นขา
        croth: "45", //เป้า
        shoulder: "45", //ไหล่
        arm_length: "45",//แขนยาว
        calf: "45",//น่องขา
        tip_of_leg: "45",//ปลายขา

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
                    firstname: data.firstname,
                    lastname: data.lastname,
                    date_of_birth: data.lastname,
                    phone_number: data.phone_number,
                    gender: data.gender,
                    address: data.address,
                    province: data.province,
                    district: data.district,
                    zip_code: data.zip_code,
                    whose_size: data.whose_size,
                    shirt_length: data.shirt_length,
                    chest_size: data.chest_size,
                    waistline: data.waistline,
                    hip: data.hip,
                    waist_shirt: data.waist_shirt,
                    hip_shirt: data.hip_shirt,
                    thigh: data.thigh,
                    croth: data.croth,
                    shoulder: data.shoulder,
                    arm_length: data.arm_length,
                    calf: data.calf,
                    tip_of_leg: data.tip_of_leg,                   
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

    const handleAddSize = () => {
        // Add a new item
        const newItem = { id: `New-${selectItems.length}`, label: `ขนาดตัวใหม่ ${selectItems.length + 1}` };
        setSelectItems([...selectItems, newItem]);
      };
    
      const handleDeleteSize = (index) => {
        // Delete the selected item
        const updatedItems = selectItems.filter((_, idx) => idx !== index);
        setSelectItems(updatedItems);
      };
    
      const handleEditSize = (index) => {
        // Set the index for editing
        setEditingIndex(index);
        setNewItemLabel(selectItems[index].label);
      };
    
      const handleSaveEditSize = () => {
        // Save the edited item
        const updatedItems = selectItems.map((item, idx) =>
          idx === editingIndex ? { ...item, label: newItemLabel } : item
        );
        setSelectItems(updatedItems);
        setEditingIndex(null);
      };
    
    return (
        <div className="px-5 lg:px-20">
            <div className="text-2xl py-3">Profile</div>
            <div className="w-full lg:w-auto h-full bg-white shadow-xl p-5 lg:p-10">
                <div className="Profiledetail">
                    <div className="flex flex-col lg:flex-row">
                        <img
                            src="https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain"
                            alt="profile.jpg"
                            className="w-32 h-32 lg:w-48 lg:h-48"
                        />
                        <div className="pt-5 lg:pt-0 lg:pl-5">
                            <div className="text-2xl font-bold">{userInfo.username}</div>
                            <div className="flex flex-col lg:flex-row">
                                <div className="name">
                                    <p>Firstname</p>
                                    <input
                                        name="username"
                                        type="text"
                                        value={userInfo.firstname}
                                        className="border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="lg:pl-10">
                                    <p>Lastname</p>
                                    <input
                                        name="lastname"
                                        type="text"
                                        value={userInfo.lastname}
                                        className="border border-gray-300 rounded-xl h-10 px-5"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row pt-3">
                                <div className="mb-4 lg:mb-0">
                                    <p>Date of Birth</p>
                                    <input
                                        name="dob"
                                        type="text"
                                        value={userInfo.date_of_birth}
                                        className="border border-gray-300 rounded-xl h-10 px-5"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="lg:pl-10 mb-4 lg:mb-0">
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
                                <div className="lg:pl-10">
                                    <p>Gender</p>
                                    <input
                                        name="gender"
                                        type="text"
                                        value={userInfo.gender}
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
                    <div className="flex flex-col lg:flex-row pt-6 lg:pt-16 items-center">
                    {!isEditing ? (
                        <>
                            <p className="flex-auto lg:w-24">Size Profile</p>
                            <div className="select-user w-full lg:w-auto">
                                <div className="lg:pl-8 ">
                            
                                <Select>
                                    <SelectTrigger className='w-96 col-span-2'>
                                    <SelectValue placeholder={userInfo.whose_size} />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='A'>ขนาดตัวของนาย A</SelectItem> 
                                        <SelectItem value='B'>ขนาดตัวของนาย B</SelectItem>
                                        <SelectItem value='C'>ขนาดตัวของนาย C</SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                </div>
                            </div>
                        </>
                    ):(
                        <>
                            <p className="flex-auto lg:w-24">Size Profile</p>
                            <div className='flex'>
                                <button
                                onClick={handleDeleteSize} // Set up deletion functionality
                                className="ml-3 w-auto   bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-2 rounded"
                                >
                                    Del
                                </button>
                                <button
                                onClick={handleAddSize}
                                className="ml-3 w-auto  bg-white hover:bg-gray-500 hover:text-white text-gray-500 border py-2 px-2 rounded"
                                >
                                    Add
                                </button>
                                <button
                                onClick={handleSaveEditSize}
                                className="ml-3 w-auto bg-white  hover:bg-gray-500 hover:text-white text-gray-500 border py-2 px-3 rounded"
                                >
                                    <MdModeEdit />
                                </button>
                            </div>
                            <div className="select-user w-full lg:w-auto">
                                <div className="lg:pl-4 ">
                
                                <Select>
                                    <SelectTrigger className='w-96 col-span-2'>
                                    <SelectValue placeholder={userInfo.whose_size} />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        {selectItems.map((item, index) => (
                                        <SelectItem key={item.id} value={item.id}>
                                            {editingIndex === index ? (
                                            <input
                                                type="text"
                                                value={newItemLabel}
                                                onChange={(e) => setNewItemLabel(e.target.value)}
                                            />
                                            ) : (
                                            item.label
                                            )}
                                        </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                </div>
                            </div>
                        </>
                    )}
                    </div>
                    <div className="flex flex-col lg:flex-row pt-3">
                        <div className="flex-1 mb-4 lg:mb-0">เสื้อ</div>
                        <div className="flex-1 lg:pl-10">กางเกง</div>
                    </div>
                    <div className="flex flex-col lg:flex-row pt-3">
                        <div className="mb-4 lg:mb-0">
                            <p>เสื้อยาว</p>
                            <input
                                name="shirt_long"
                                type="text"
                                value={userInfo.shirt_length}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>รอบอก</p>
                            <input
                                name="chest"
                                type="text"
                                value={userInfo.chest_size}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>รอบเอว</p>
                            <input
                                name="waist"
                                type="text"
                                value={userInfo.waistline}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10">
                            <p>สะโพก</p>
                            <input
                                name="hip"
                                type="text"
                                value={userInfo.hip}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row pt-3">
                        <div className="mb-4 lg:mb-0">
                            <p>เอวเสื้อ</p>
                            <input
                                name="shirt_waist"
                                type="text"
                                value={userInfo.waist_shirt}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>สะโพกเสื้อ</p>
                            <input
                                name="shirt_hip"
                                type="text"
                                value={userInfo.hip_shirt}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>ต้นขา</p>
                            <input
                                name="thigh"
                                type="text"
                                value={userInfo.thigh}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10">
                            <p>เป้า</p>
                            <input
                                name="crotch"
                                type="text"
                                value={userInfo.croth}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row pt-3">
                        <div className="mb-4 lg:mb-0">
                            <p>ไหล่</p>
                            <input
                                name="shoulder"
                                type="text"
                                value={userInfo.shoulder}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>แขนยาว</p>
                            <input
                                name="sleeve"
                                type="text"
                                value={userInfo.arm_length}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>น่องขา</p>
                            <input
                                name="calf"
                                type="text"
                                value={userInfo.calf}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="lg:pl-10">
                            <p>ปลายขา</p>
                            <input
                                name="leg_opening"
                                type="text"
                                value={userInfo.tip_of_leg}
                                className="border border-gray-300 rounded-xl h-10 px-5"
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
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

export default ClientEditProfile;
