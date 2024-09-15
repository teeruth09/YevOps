import PropTypes from 'prop-types'

import { useCallback, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const ShopCarousel = ({ imageUrls }) => {
  const [carouselApi, setCarouselApi] = useState()
  const [mainCarouselIndex, setMainCarouselIndex] = useState(0)

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

    if (carouselApi && !(mainCarouselIndex >= imageUrls.length - 1))
      carouselApi.scrollPrev()
  }, [carouselApi, mainCarouselIndex, imageUrls.length])

  return (
    <>
      <div className='flex items-center justify-center bg-gray-300 w-full aspect-[4/3]'>
        <Carousel className='w-3/4'>
          <CarouselContent>
            {imageUrls.map((url) => (
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
            {imageUrls.map((url) => (
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
    </>
  )
}

ShopCarousel.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ShopCarousel
