import React, { useState, useEffect } from 'react'
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from '@/components/ui/select'

const CustomerSizeInfoCard= ({size, onChange}) =>{

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    // const [selectedSize, setSelectedSize] = useState(size); 

    useEffect(() => {
        const handleResize = () => {
        // Set true if the screen width is less than 640px (Tailwind's 'sm' breakpoint)
        setIsSmallScreen(window.innerWidth < 1200);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize the state on mount

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className='mb-8 p-8 rounded-lg shadow-2xl bg-white'>
            <h3 className='font-bold text-2xl mb-8'>Customer Information</h3>
            <hr className='mb-4' />
            <div>
                <p className="flex-auto lg:w-24">Size Profile</p>
                <div className="select-user w-full lg:w-auto">
                    <div>
                    <Select  onValueChange={(value) => onChange('size', value)}>
                        <SelectTrigger className='w-96 col-span-2'>
                            <SelectValue placeholder="ขนาดตัวของคุณ"/>
                        </SelectTrigger>
                        {/* <SelectContent>
                        <SelectGroup>
                            <SelectItem value='A'>ขนาดตัวของนาย A</SelectItem> 
                            <SelectItem value='B'>ขนาดตัวของนาย B</SelectItem>
                            <SelectItem value='C'>ขนาดตัวของนาย C</SelectItem>
                        </SelectGroup>
                        </SelectContent> */}
                    </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerSizeInfoCard
