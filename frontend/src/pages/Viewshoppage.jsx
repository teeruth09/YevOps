// import Navbar from '../components/Navbar'
import { FaStar } from 'react-icons/fa6'

import { useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const Viewshoppage = () => {
  const [mainCarouselApi, setMainCarouselApi] = useState()
  const [carouselApi, setCarouselApi] = useState()

  const mockImages = [
    'mock-products/hitman-suit.png',
    'mock-products/wedding-dress.png',
    'mock-products/shop-preview.png',
    'login-background.png',
    'profile.png',
  ]

  return (
    <div>
      {/* <Navbar /> */}

      <div className='flex flex-col w-full p-6 gap-4'>
        <p className='text-sm'>View Shop &gt; Shop</p>

        <div className='grid grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex w-full gap-2 items-center'>
              <img
                src='profile.png'
                alt='profile'
                className='w-8 h-8 rounded-full'
              />
              <p className='text-xl font-bold mx-2'>Nai_mana dotshop</p>
              <FaStar />
              <p className='text-sm'>5.0 (37)</p>
            </div>

            <div className='flex items-center justify-center bg-gray-300 w-full aspect-[4/3]'>
              <Carousel setApi={setMainCarouselApi} className='w-3/4'>
                <CarouselContent>
                  {mockImages.map((url) => (
                    <CarouselItem
                      key={url}
                      className='flex justify-center items-center'
                    >
                      <img
                        src={url}
                        alt='product'
                        className='aspect-[4/3] object-cover'
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div
                  onClick={() => {
                    if (carouselApi) {
                      carouselApi.scrollPrev()
                    }
                  }}
                >
                  <CarouselPrevious />
                </div>
                <div
                  onClick={() => {
                    if (carouselApi) {
                      carouselApi.scrollNext()
                    }
                  }}
                >
                  <CarouselNext />
                </div>
              </Carousel>
            </div>

            <div className='flex w-full'>
              <Carousel setApi={setCarouselApi} className='w-full'>
                <CarouselContent className='ml-0'>
                  {mockImages.map((url) => (
                    <CarouselItem
                      key={url}
                      className='flex justify-center items-center basis-1/3 aspect-[4/3] bg-gray-300 pl-0'
                    >
                      <img src={url} alt='product' className='object-cover' />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewshoppage
