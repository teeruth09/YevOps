import React, { useState } from 'react';

const DropdownForFilterBar = ({ options, placeHolder, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');
  const [currentOptions, setCurrentOptions] = useState(options);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    onChange(option);
    
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block text-left w-full h-full">
      {/* Dropdown Button */}
      <button 
        onClick={toggleDropdown}
        className='flex flex row h-1/2 w-full border-b border-red-300 text-left text-2xl font-bold'
      >
        {selectedOption || placeHolder}
        <img className='w-[15px] ml-4 absolute top-2.5 right-1' src="https://cdn-icons-png.flaticon.com/128/32/32195.png" alt="" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white">
          <div className='py-1'>
            {/* Options List */}
            {currentOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelectOption(option)}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownForFilterBar;