import React, { useState } from 'react';

const DropdownForFilterBar = ({ options, placeHolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentOptions, setCurrentOptions] = useState(options);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button 
        onClick={toggleDropdown}
        className='flex flex row h-1/2 w-[350px] border-b border-red-300 text-left text-2xl font-bold'
      >
        {selectedOption || placeHolder}
        <img className='w-[15px] ml-4 absolute top-2.5 right-1' src="https://cdn-icons-png.flaticon.com/128/32/32195.png" alt="" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[200px] rounded-md shadow-lg bg-white">
          <div className='py-1'>
            {/* Options List */}
            {currentOptions.map((option, index) => (
              <a
                key={index}
                href="#"
                onClick={() => handleSelectOption(option)}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownForFilterBar;