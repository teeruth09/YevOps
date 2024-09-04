import React, { useState } from 'react';

const ClientEditProfile = () => {
    const [username, setUsername] = useState("Teeruth");
    const [lastname, setLastname] = useState("Ieowsakulrat");

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
                            <div className="text-2xl font-bold">Username</div>
                            <div className="flex flex-col lg:flex-row">
                                <div className="name">
                                    <p>Name</p>
                                    <input
                                        name="username"
                                        type="text"
                                        value={username}
                                        className="border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0"
                                    />
                                </div>
                                <div className="lg:pl-10">
                                    <p>Lastname</p>
                                    <input
                                        name="lastname"
                                        type="text"
                                        value={lastname}
                                        className="border border-gray-300 rounded-xl h-10 px-5"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row pt-3">
                                <div className="mb-4 lg:mb-0">
                                    <p>Date of Birth</p>
                                    <input
                                        name="dob"
                                        type="text"
                                        value="2-Sep-2024"
                                        className="border border-gray-300 rounded-xl h-10 px-5"
                                    />
                                </div>
                                <div className="lg:pl-10 mb-4 lg:mb-0">
                                    <p>Phone Number</p>
                                    <input
                                        name="phonenumber"
                                        type="text"
                                        value="xxxxxxxxxxxx"
                                        className="border border-gray-300 rounded-xl h-10 px-5"
                                    />
                                </div>
                                <div className="lg:pl-10">
                                    <p>Gender</p>
                                    <input
                                        name="gender"
                                        type="text"
                                        value="Gender"
                                        className="border border-gray-300 rounded-xl h-10 px-5"
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
                            value="911/2 Ladkrabang"
                            className="border border-gray-300 rounded-xl h-10 w-full px-5"
                        />
                        <div className="flex flex-col lg:flex-row pt-3">
                            <div className="w-full mb-4 lg:mb-0">
                                <p>Province</p>
                                <input
                                    name="province"
                                    type="text"
                                    value="Bangkok"
                                    className="border border-gray-300 rounded-xl h-10 w-full px-5"
                                />
                            </div>
                            <div className="lg:pl-10 w-full mb-4 lg:mb-0">
                                <p>District</p>
                                <input
                                    name="district"
                                    type="text"
                                    value="Ladkrabang"
                                    className="border border-gray-300 rounded-xl h-10 w-full px-5"
                                />
                            </div>
                            <div className="lg:pl-10 w-full">
                                <p>Zip Code</p>
                                <input
                                    name="zipcode"
                                    type="text"
                                    value="10230"
                                    className="border border-gray-300 rounded-xl h-10 w-full px-5"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row pt-6 lg:pt-16 items-center">
                        <p className="flex-auto lg:w-24">Size Profile</p>
                        <div className="select-user w-full lg:w-auto">
                            <div className="lg:pl-8">
                                <input
                                    name="sizeProfile"
                                    type="text"
                                    value="ขนาดตัวของนาย A"
                                    className="border border-gray-300 rounded-xl h-10 w-full lg:w-auto px-5"
                                />
                            </div>
                        </div>
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
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>รอบอก</p>
                            <input
                                name="chest"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>รอบเอว</p>
                            <input
                                name="waist"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10">
                            <p>สะโพก</p>
                            <input
                                name="hip"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row pt-3">
                        <div className="mb-4 lg:mb-0">
                            <p>เอวเสื้อ</p>
                            <input
                                name="shirt_waist"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>สะโพกเสื้อ</p>
                            <input
                                name="shirt_hip"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>ต้นขา</p>
                            <input
                                name="thigh"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10">
                            <p>เป้า</p>
                            <input
                                name="crotch"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row pt-3">
                        <div className="mb-4 lg:mb-0">
                            <p>ไหล่</p>
                            <input
                                name="shoulder"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>แขนยาว</p>
                            <input
                                name="sleeve"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10 mb-4 lg:mb-0">
                            <p>น่องขา</p>
                            <input
                                name="calf"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                        <div className="lg:pl-10">
                            <p>ปลายขา</p>
                            <input
                                name="leg_opening"
                                type="text"
                                value="45"
                                className="border border-gray-300 rounded-xl h-10 px-5"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row pt-10 items-center">
                        <div className="flex-1"></div>
                        <button className="w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientEditProfile;
