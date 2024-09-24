import React, { useState,useEffect } from 'react';

const UserRequestDetail = ({userRequest}) => {

    console.log("UserRequest:",userRequest)

    const [formData, setFormData] = useState({
        clothType: userRequest.clothType,
        budgetStart: userRequest.budgetStart,
        budgetStop: userRequest.budgetStop,
        deadline: userRequest.deadline,
        referenceImage: userRequest.referenceImage[0],
    });
    useEffect(() => {
        if (userRequest) {
            setFormData({
                clothType: userRequest.clothType,
                budgetStart: userRequest.budgetStart,
                budgetStop: userRequest.budgetStop,
                deadline: userRequest.deadline,
                referenceImage: userRequest.referenceImage[0],
            });
        }
    }, [userRequest]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
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
            disabled ={true}
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
                disabled ={true}
                />
                <div className="flex items-center justify-center mx-10">-</div>
                <input
                type="text"
                name="budgetStop"
                value={formData.budgetStop}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                placeholder="xxxx THB"
                disabled ={true}
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
                disabled={true}
            />
            </div>
        </div>

        <div className="mb-4 border-dashed border-2 rounded-md p-6 flex justify-center items-center bg-slate-300">
            <img src={formData.referenceImage} alt="reference.png" className='h-56 w-56' />
        </div>
        </div>
    );
};

export default UserRequestDetail;
