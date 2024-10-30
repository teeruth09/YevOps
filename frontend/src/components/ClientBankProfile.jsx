import { cn } from '@/lib/utils'
import { PrimaryButton } from '@/shared/components/CustomButton'
import { useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa6'

const ClientBankProfile = () => {
  const [selectedBank, setSelectedBank] = useState('VISA Kasikornbank')
  const [isAddingNewBank, setIsAddingNewBank] = useState(false)

  const handleAddNewBank = () => {
    setIsAddingNewBank(true)
  }

  return (
    <div className='px-5 w-full flex flex-col'>
      <div className='flex gap-4 items-center pt-3 mb-8'>
        <FaAngleLeft
          className={cn(!isAddingNewBank ? 'hidden' : 'text-gray-600 h-6 w-6', 'cursor-pointer')}
          onClick={() => setIsAddingNewBank(false)}
        />
        <h1 className='text-3xl font-semibold'>Bank</h1>
      </div>

      {!isAddingNewBank ? (
        <div className='flex items-center space-x-4'>
          {/* Bank Dropdown */}
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className='p-2 border border-gray-300 rounded flex-grow'
          >
            <option value='VISA Kasikornbank'>
              VISA Kasikornbank [Default] *5199
            </option>
            <option value='Another Bank'>Another Bank</option>
          </select>

          {/* Add New Bank Button */}
          {/* <button
            onClick={handleAddNewBank}
            className='bg-red-600 text-white px-10 py-2 rounded hover:bg-red-700'
          >
            Add
          </button> */}

          <PrimaryButton onClick={handleAddNewBank} className='w-fit px-6'>
            Add
          </PrimaryButton>
        </div>
      ) : (
        <form className='bg-white p-4 rounded-lg shadow-md space-y-4 mt-6'>
          {/* Bank Information */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='bankName' className='text-sm font-semibold'>
                Bank Name
              </label>
              <input
                type='text'
                id='bankName'
                className='p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div>
              <label htmlFor='branchName' className='text-sm font-semibold'>
                Branch Name
              </label>
              <input
                type='text'
                id='branchName'
                className='p-2 w-full border border-gray-300 rounded'
              />
            </div>
          </div>

          {/* Branch Information */}
          <div className='grid grid-cols-1 gap-4'>
            <div>
              <label htmlFor='branchNumber' className='text-sm font-semibold'>
                Branch Number
              </label>
              <input
                type='text'
                id='branchNumber'
                className='p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div>
              <label htmlFor='branchAddress' className='text-sm font-semibold'>
                Branch Address
              </label>
              <input
                type='text'
                id='branchAddress'
                className='p-2 w-full border border-gray-300 rounded'
                placeholder='Street Address'
              />
              <input
                type='text'
                className='mt-2 p-2 w-full border border-gray-300 rounded'
                placeholder='Street Address Line 2'
              />
              <div className='grid grid-cols-2 gap-4 mt-2'>
                <input
                  type='text'
                  className='p-2 border border-gray-300 rounded'
                  placeholder='City'
                />
                <input
                  type='text'
                  className='p-2 border border-gray-300 rounded'
                  placeholder='Region'
                />
              </div>
              <div className='grid grid-cols-2 gap-4 mt-2'>
                <input
                  type='text'
                  className='p-2 border border-gray-300 rounded'
                  placeholder='Postal / Zip Code'
                />
                <select className='p-2 border border-gray-300 rounded'>
                  <option value='Romania'>Romania</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className='grid grid-cols-1 gap-4'>
            <div>
              <label htmlFor='currency' className='text-sm font-semibold'>
                Bank Account Currency
              </label>
              <input
                type='text'
                id='currency'
                className='p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div>
              <label htmlFor='swift' className='text-sm font-semibold'>
                SWIFT/BIC
              </label>
              <input
                type='text'
                id='swift'
                className='p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div>
              <label htmlFor='iban' className='text-sm font-semibold'>
                IBAN No.
              </label>
              <input
                type='text'
                id='iban'
                className='p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div>
              <label htmlFor='accountName' className='text-sm font-semibold'>
                Bank Account Name
              </label>
              <input
                type='text'
                id='accountName'
                className='p-2 w-full border border-gray-300 rounded'
              />
            </div>
          </div>

          {/* Account Type */}
          <div className='space-y-2'>
            <label className='text-sm font-semibold'>Account Type</label>
            <div className='flex items-center space-x-2'>
              <input
                type='radio'
                id='checking'
                name='accountType'
                value='checking'
              />
              <label htmlFor='checking'>Checking</label>
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='radio'
                id='savings'
                name='accountType'
                value='savings'
              />
              <label htmlFor='savings'>Savings</label>
            </div>
            <div className='flex items-center space-x-2'>
              <input type='radio' id='other' name='accountType' value='other' />
              <label htmlFor='other'>Other</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center my-16'>
            <PrimaryButton className='w-full'>Send</PrimaryButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default ClientBankProfile
