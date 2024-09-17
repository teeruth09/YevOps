import React, { useState } from 'react'

function PaymentMethodCard(props) {
    const orderStatus = props.orderStatus;
    const [selectedBank, setSelectedBank] = useState(null);

  return (
    <div className='mb-8 p-8 rounded-lg shadow-2xl bg-white'>
        <h3 className='font-bold text-2xl mb-8'>Payment Method</h3>
        <hr className='mb-8' />
        <div>
            <p className='ml-1 text-lg'>Bank Account</p>
            <div className='flex gap-x-5 flex-col 2xl:flex-row'>
                <div className="flex items-center space-x-4">
                {/* Bank Dropdown */}
                <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    disabled={!(orderStatus === "Payment")}
                >
                    <option value="VISA Kasikornbank">VISA Kasikornbank [Default] *5199</option>
                    <option value="Another Bank">Another Bank</option>
                </select>
        
                {/* Add New Bank Button */}
                <button
                    className="bg-red-600 text-white px-10 py-2 rounded hover:bg-red-700"
                    hidden={!(orderStatus === "Payment")}
                >
                    Add
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentMethodCard
