import React, { useEffect, useState, useRef } from 'react';
import NavbarShop from '@/components/NavbarShop';
import ShopSidebar from '@/components/ShopSidebarProfile';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const ShopProfilePreviewPage = () => {
    const [orderTypes, setOrderTypes] = useState([]);
    const [buttonCount, setButtonCount] = useState(0);
    
    const [shopInfo, setShopInfo] = useState(null)
    const [newAvatarUrls, setNewAvatarUrls] = useState([]); // Array to hold image URLs
    const [avatarFiles, setAvatarFiles] = useState([]); // Array to hold files
    const hiddenImageInputRef = useRef(null);

    const navigate = useNavigate();
    // Fetch shop's Order types
    useEffect(() => {
        const fetchShopOrderTypes = async () => {
            const token = localStorage.getItem('x-access-token');
            try {
                const response = await fetch('http://localhost:5555/shop/shopOrderTypes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    },
                });
                const data = await response.json();
                // console.log("shopAllOrderType", data);
                setOrderTypes(data.orderTypeDetails || []);
                setButtonCount(data.orderTypeDetails ? data.orderTypeDetails.length : 0);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        
        fetchShopOrderTypes();
    }, []);
    
    // Update package details in state as user modifies the form
    const handleInputChange = (index, field, value) => {
        setOrderTypes((prevOrderTypes) =>
            prevOrderTypes.map((orderType, i) =>
                i === index ? { ...orderType, [field]: value } : orderType
            )
        );
    };

    // Function to handle adding new packages
    const handleAddPackage = () => {
        if (buttonCount < 3) {
            setOrderTypes([...orderTypes, { name: '', price: '', detail: '', deadline: '' }]);
            // setOrderTypes([{ name: '', price: '', detail: '', deadline: '' }]);
            setButtonCount(buttonCount + 1);
        }
    };

    // Save order type details to backend
    const handleSave = async () => {
        const token = localStorage.getItem('x-access-token');
        try {
            const response = await fetch('http://localhost:5555/orderTypes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
                body: JSON.stringify({
                    orderTypes,
                }),
            });
            console.log("Order Types being saved:", orderTypes);

            const result = await response.json();
            if (response.ok) {
                console.log('Order types saved successfully:', result);
                alert('Order types saved successfully!');
                navigate('/shop/profile/post');
            } else {
                console.error('Failed to save order types:', result);
                alert('Failed to save order types.');
            }
        } catch (error) {
            console.error('Error saving order types:', error);
            alert('An error occurred while saving order types.');
        }
    };

    const handleAvatarChange = (e) => {
        const files = e.target.files;

        if (files) {
            const newFilesArray = Array.from(files); // Convert FileList to Array

            // Update state by combining existing files with new files
            setAvatarFiles((prevFiles) => [...prevFiles, ...newFilesArray]);

            const readerPromises = newFilesArray.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result); // Resolve the promise with the image URL
                    };
                    reader.readAsDataURL(file);
                });
            });

            // Once all images are read, update the state with the URLs
            Promise.all(readerPromises).then((urls) => {
                setNewAvatarUrls((prevUrls) => [...prevUrls, ...urls]); // Combine with existing URLs
            });
        }
    };
    // Log the updated avatarFiles whenever it changes
    // useEffect(() => {
    //     console.log("Current file count:", avatarFiles);
    // }, [avatarFiles]);

    const handleSavePreviewImage = async () =>{
        const token = localStorage.getItem('x-access-token');
        const formData = new FormData();

        // Add each selected image file to the FormData
        avatarFiles.forEach((file) => {
            formData.append('previewImage', file); // 'previewImage' should match the field name in the backend
        });

        try {
            const response = await fetch('http://localhost:5555/shop/shopdata/previewImage', {
                method: 'POST',
                headers: {
                    'x-access-token': token,
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                // console.log('Preview images saved successfully:', result);
                alert('Preview images saved successfully!');
                navigate('/shop/profile/post');
            } else {
                // console.error('Failed to save order types:', result);
                alert('Failed to save preview images.');
            }
        } catch (error) {
            console.error('Error saving preview images:', error);
            alert('An error occurred while saving preview images.');
        }
    }

    // Fetch shop's Order types
    useEffect(() => {
        const fetchAllPreviewImage = async () => {
            const token = localStorage.getItem('x-access-token');
            try {
                const response = await fetch('http://localhost:5555/shop/getAllpreviewImage', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    },
                });
                const data = await response.json();
                console.log("fetchAllPreviewImage", data);
                setShopInfo({previewImage: data.previewImage})
                // setOrderTypes(data.orderTypeDetails || []);
                // setButtonCount(data.orderTypeDetails ? data.orderTypeDetails.length : 0);
            } catch (error) {
                console.error('Failed to fetch previewImage', error);
            }
        };
        
        fetchAllPreviewImage();
    }, []);

    return (
        <div>
            <NavbarShop />
            <div className='flex pl-5 pt-5'>
                <ShopSidebar />
                <div className='grid justify-start pl-[300px] w-[calc((100vw-19rem))]'>
                    {/* Shop Preview Image */}
                    <div className='w-[500px] flex flex-col'>
                        <div className='w-full h-[80px] flex justify-start items-center border-b'>
                            <p className='text-2xl font-semibold'>Shop Preview Image</p>
                        </div>
                        <div className='w-full h-[300px] flex flex-col pt-3'>
                            <p className='mb-3'>Upload your preview image here!</p>
                            {/* <div className='w-full h-5/6 bg-gray-200 flex justify-center items-center'>
                                Input Image Zone
                            </div> */}
                            <div className="w-full h-5/6  flex">
                                    {newAvatarUrls.length > 0 ? (
                                    newAvatarUrls.slice(0, 4).map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`profile-${index}.jpg`}
                                        className="w-[250px] h-full  object-cover mr-10 border-4 border-blue-500"
                                        onClick={() => hiddenImageInputRef.current?.click()}
                                        />
                                    ))
                                    ) : (
                                        shopInfo?.previewImage && shopInfo.previewImage.length > 0 ? (
                                            shopInfo.previewImage.slice(0, 4).map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`previewImage-${index}`}
                                                    className="w-[250px] h-full object-cover mr-10 border-4 border-blue-500"
                                                    onClick={() => hiddenImageInputRef.current?.click()}
                                                />
                                            ))
                                        ) : (
                                        <img
                                            src={shopInfo?.previewImage}
                                            alt="previewImage"
                                            className="w-full h-32 lg:w-48 lg:h-48 object-cover"
                                            onClick={() => hiddenImageInputRef.current?.click()}
                                        />                                     
                                        )
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        placeholder='click here to upload'
                                        ref={hiddenImageInputRef}
                                        onChange={handleAvatarChange}
                                        multiple // Allow multiple file selection
                                        style={{ display: 'none' }}
                                    />
                                </div>
                        </div>
                    </div>

                    <div className='flex flex-row justify-start  pt-5 mb-10'>
                                <button
                                    className='w-24 h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700'
                                    onClick={handleSavePreviewImage}
                                >
                                    Save
                                </button>
                                <button className='ml-10 w-24 h-10 border-[1px] shadow-xl bg-white text-black text-xl font-medium flex items-center justify-center rounded-lg hover:bg-gray-200'>
                                    Cancel
                                </button>
                            </div>

                    {/* Shop Ordertype */}
                    <div className='w-[500px] flex flex-col'>
                        <div className='w-full h-[80px] flex justify-start items-center border-b'>
                            <p className='text-2xl font-semibold'>Order Package Settings</p>
                        </div>
                        <div className='w-full flex flex-col pt-3'>
                            <p className='mb-8'>Setting up your details here!</p>

                            {/* Render Order Types */}
                            {orderTypes.map((orderType, index) => (
                                <div className='pl-5 pt-5' key={index}>
                                    <p className='mb-6 border-b text-xl'>{`Package ${index + 1}`}</p>
                                    <div className='my-3 mr-3 w-3/5'>
                                        <TextField
                                            defaultValue={orderType.name}
                                            required
                                            label="Package Name (4-10 characters)"
                                            fullWidth
                                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-row'>
                                        <div className='my-3 mr-3 w-2/5'>
                                            <TextField
                                                defaultValue={orderType.price}
                                                required
                                                label="Price (THB)"
                                                fullWidth
                                                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                            />
                                        </div>
                                        <div className='my-3 mr-3 w-2/5'>
                                            <TextField
                                                defaultValue={orderType.deadline}
                                                required
                                                label="Working time (days)"
                                                fullWidth
                                                onChange={(e) => handleInputChange(index, 'deadline', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='my-3 mr-3 w-full'>
                                        <TextField
                                            defaultValue={orderType.detail}
                                            required
                                            label="Product Details"
                                            fullWidth
                                            multiline
                                            onChange={(e) => handleInputChange(index, 'detail', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Add Package Button */}
                            {buttonCount < 3 && (
                                <button onClick={handleAddPackage} className='mt-4 border-[1px] h-10 shadow-lg font-medium rounded-lg hover:bg-gray-300'>
                                    Add {buttonCount + 1} Package
                                </button>
                            )}

                            <div className='flex flex-row justify-start pl-5 pt-5 mb-10'>
                                <button
                                    className='w-24 h-10 border-[1px] shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700'
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button className='ml-10 w-24 h-10 border-[1px] shadow-xl bg-white text-black text-xl font-medium flex items-center justify-center rounded-lg hover:bg-gray-200'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopProfilePreviewPage;
