import React, { useState,useEffect } from 'react';

const OrderDetail = ({userRequest, onRequestChange}) => {

  console.log("OrderDetail UserRequest",userRequest)
  const [formData, setFormData] = useState({
    clothType: '',
    budgetStart: '',
    budgetStop: '',
    deadline: '',
    referenceImage: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    onRequestChange(name, value); // Pass individual field changes
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      referenceImage: file,
    });
  
    onRequestChange('referenceImage', file); // Pass image change as a separate field
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
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
          {formData.referenceImage ? (
            <img
              src={URL.createObjectURL(formData.referenceImage)}
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
