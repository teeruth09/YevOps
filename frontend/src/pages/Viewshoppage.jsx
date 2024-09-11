import Navbar from '../components/Navbar'
import { FaStar } from 'react-icons/fa6'

import { useCallback, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Progress } from '@/components/ui/progress'

const Viewshoppage = () => {
  const [carouselApi, setCarouselApi] = useState()
  const [mainCarouselIndex, setMainCarouselIndex] = useState(0)

  const mockImages = [
    'mock-products/hitman-suit.png',
    'mock-products/wedding-dress.png',
    'mock-products/shop-preview.png',
    'login-background.png',
    'profile.png',
  ]

  // The carosel with 3 images can only go next if the current image is not the first or the one before last
  const carouselScrollNext = useCallback(() => {
    setMainCarouselIndex((prev) => prev + 1)

    if (carouselApi && !(mainCarouselIndex < 1)) {
      console.log('next updated')
      carouselApi.scrollNext()
    }
  }, [carouselApi, mainCarouselIndex])

  // The carosel with 3 images can only go prev if the current image is not the last or the one after the first
  const carouselScrollPrev = useCallback(() => {
    setMainCarouselIndex((prev) => prev - 1)

    if (carouselApi && !(mainCarouselIndex >= mockImages.length - 1))
      carouselApi.scrollPrev()
  }, [carouselApi, mainCarouselIndex, mockImages.length])

  return (
    <div>
      <Navbar />

      <div className='flex flex-col w-full p-6 gap-4'>
        <p className='text-sm'>View Shop &gt; Shop</p>

        <div className='grid grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex w-full gap-2 items-center'>
              <img
                src='profile.png'
                alt='profile'
                className='w-12 h-12 rounded-full'
              />
              <p className='text-xl font-bold mx-2'>Nai_mana dotshop</p>
              <FaStar />
              <p className='text-sm'>5.0 (37)</p>
            </div>

            <div className='flex items-center justify-center bg-gray-300 w-full aspect-[4/3]'>
              <Carousel className='w-3/4'>
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

                <CarouselPrevious onClick={carouselScrollPrev} />

                <CarouselNext onClick={carouselScrollNext} />
              </Carousel>
            </div>

            <div className='flex w-full'>
              <Carousel setApi={setCarouselApi} className='w-full'>
                <CarouselContent className='ml-0'>
                  {mockImages.map((url) => (
                    <CarouselItem
                      key={url}
                      className='flex justify-center items-center basis-1/3 bg-gray-300 pl-0'
                    >
                      <img
                        src={url}
                        alt='product'
                        className='w-full aspect-[4/3] object-cover'
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className='mt-8 flex flex-col gap-2 border-2 p-6 rounded shadow'>
              <p className='text-2xl'>About us</p>
              <div className='w-full h-0.5 bg-gray-300' />

              <div className='grid grid-cols-3 gap-2'>
                <div className='flex flex-col col-span-2 gap-2'>
                  <p>Address</p>
                  <p>
                    เลขที่ 352/29 แขวง คลองต้นนุ่น เขตลาดกระบัง กรุงเทพมหานคร
                    10520
                  </p>

                  <p>Contact us</p>
                  <p>0945552867</p>
                </div>

                <div className='flex flex-col gap-2'>
                  <p>Member since</p>
                  <p>กันยายน 2024</p>
                </div>
              </div>

              <p className='text-2xl mt-8'>Description</p>
              <div className='w-full h-0.5 bg-gray-300' />

              <div className='grid grid-cols-3 gap-2'>
                <div className='flex flex-col col-span-2'>
                  <p>
                    สวัสดีครับพวกเรา Nai_mana_dotshop รับตัดชุด Cosplay ทุกชนิด
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 flex flex-col border-2 p-6 rounded shadow'>
              <p className='text-2xl'>Reviews</p>
              <div className='w-full h-0.5 bg-gray-300' />

              <p className='my-4'>37 reviews for this dressmaker</p>

              <div className='w-1/2 flex gap-2 items-center'>
                <p className='whitespace-nowrap pr-2'>5 Stars</p>
                <Progress value={38} className='mt-1' />
                <p>(37)</p>
              </div>
              <div className='w-1/2 flex gap-2 items-center'>
                <p className='whitespace-nowrap pr-2'>4 Stars</p>
                <Progress value={38} className='mt-1' />
                <p>(37)</p>
              </div>
              <div className='w-1/2 flex gap-2 items-center'>
                <p className='whitespace-nowrap pr-2'>3 Stars</p>
                <Progress value={38} className='mt-1' />
                <p>(37)</p>
              </div>
              <div className='w-1/2 flex gap-2 items-center'>
                <p className='whitespace-nowrap pr-2'>2 Stars</p>
                <Progress value={38} className='mt-1' />
                <p>(37)</p>
              </div>
              <div className='w-1/2 flex gap-2 items-center'>
                <p className='whitespace-nowrap pr-2'>1 Stars</p>
                <Progress value={38} className='mt-1' />
                <p>(37)</p>
              </div>
            </div>

            <div className='mt-8 flex flex-col gap-2 border-2 p-6 rounded shadow'>
              <div className='flex items-center gap-2'>
                <img
                  src={mockImages[4]}
                  alt='profile'
                  className='h-12 w-12 rounded-full'
                />

                <div className='flex flex-col'>
                  <p>สมบูรณายาสิทธิราช</p>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center'>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <p>5</p>
                    <p>|</p>
                    <p>15 Aug 2024</p>
                  </div>
                </div>
              </div>
              <div className='w-full h-0.5 bg-gray-300' />
              <p>
                สามารถตัดเย็บได้แบบว้าวซ่าจิงเกอเบล ทำยังไงก็ได้แต่ว่านะ
                ร้านอาจจะของระยะเวลา ในการทำสักหลายวันเพราะว่าถูกสุด
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewshoppage
