import React, { useState,useEffect,useRef } from 'react';

const OrderDetail = ({userRequest, onRequestChange}) => {

  console.log("OrderDetail UserRequest",userRequest)
  const [formData, setFormData] = useState({
    userRequestDescription: {
      clothType: '',
      budgetStart: '',
      budgetStop: '',
      deadline: '',
      referenceImage: '',
    },
  });
  const [newAvatarUrl, setNewAvatarUrl] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const hiddenImageInputRef = useRef(null)
  // useEffect(() => {
  //   if (userRequest) {
  //     setFormData({
  //       clothType: userRequest.clothType || '',
  //       budgetStart: userRequest.budgetStart || '',
  //       budgetStop: userRequest.budgetStop || '',
  //       deadline: userRequest.deadline || '',
  //       // referenceImage: userRequest.referenceImage || '',
  //     });
  //   }
  // }, [userRequest]); // Depend on userRequest so it updates when props change

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  
  //   onRequestChange(name, value); // Pass individual field changes
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      userRequestDescription: {
        ...prevFormData.userRequestDescription,
        [name]: value,
      },
    }));

    onRequestChange('userRequestDescription', {
      ...formData.userRequestDescription,
      [name]: value,
    });
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
      
  //     const reader = new FileReader()

  //     // reader.onload = () => {
  //     //   setNewAvatarUrl(reader.result)
  //     // }

  //     reader.readAsDataURL(file)
  //     setFormData({
  //       ...formData,
  //       referenceImage: file,
  //     });
  //   }
  
  //   onRequestChange('referenceImage', file); // Pass image change as a separate field
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Update the local formData state
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          userRequestDescription: {
            ...prevFormData.userRequestDescription,
            referenceImage: file, // Set the file directly
          },
        };
  
        // Notify the parent component with the updated data
        onRequestChange('userRequestDescription', updatedFormData.userRequestDescription);
        
        // Log to confirm file update
        console.log("Updated formData with file:", updatedFormData.userRequestDescription.referenceImage);
  
        return updatedFormData;
      });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()

      reader.onload = () => {
        setNewAvatarUrl(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Detail</h2>

      <div className="mb-4">
        <label className="block text-gray-700">ชนิดผ้า</label>
        <input
          type="text"
          name="clothType"
          value={formData.clothType}
          onChange={handleInputChange}
          className="w-full border p-2 rounded-md"
          placeholder="ชนิดผ้า"
        />
      </div>

      <div className="mb-4">
        <div>
          <label className="block text-gray-700">งบประมาณ</label>
          <div className='flex'>
            <input
              type="text"
              name="budgetStart"
              value={formData.budgetStart}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md "
              placeholder="xxxx THB"
            />
            <div className="flex items-center justify-center mx-10">-</div>
            <input
              type="text"
              name="budgetStop"
              value={formData.budgetStop}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              placeholder="xxxx THB"
            />
          </div>
        </div>
        <div>
        </div>
      </div>

      <div className="mb-4">
        <div>
          <label className="block text-gray-700">เดดไลน์</label>
          <input
            type="text"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="ตัวอย่าง: 17-Sep-2024"
          />
        </div>
      </div>

      <div className="mb-4 border-dashed border-2 rounded-md p-6 flex justify-center items-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-center text-red-500"
        >
          {formData.userRequestDescription.referenceImage ? (
            <img
              src={formData.userRequestDescription.referenceImage}
              alt="Uploaded preview"
              className="w-20 h-20 object-cover"
            />
          ) : (
            <div>
              <img
                src="https://via.placeholder.com/150"
                alt="Upload icon"
                className="w-10 h-10 mx-auto"
              />
              <p className="mt-2">Upload your example image</p>
            </div>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default OrderDetail;
