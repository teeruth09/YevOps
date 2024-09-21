import PropTypes from 'prop-types'

import { Progress } from '@/components/ui/progress'

import { FaRegStar } from 'react-icons/fa6'
import { FaStar } from 'react-icons/fa6'
import { FaStarHalfStroke } from 'react-icons/fa6'

import { cn } from '@/lib/utils'
import { Map, Marker } from '@vis.gl/react-google-maps'
import { MAP_API } from '@/global-config'

export const MainDetailCard = () => {
  return (
    <div className='mt-8 flex flex-col gap-2 border-2 rounded shadow overflow-hidden'>
      {MAP_API && (
        <div className='h-[40vh]'>
          <Map
            defaultZoom={9}
            defaultCenter={{ lat: 13, lng: 100 }}
            disableDefaultUI
          >
            <Marker position={{ lat: 13, lng: 100 }} />
          </Map>
        </div>
      )}

      <div className='flex flex-col p-6 gap-2'>
        <p className='text-2xl'>About us</p>
        <div className='w-full h-0.5 bg-gray-300' />

        <div className='grid grid-cols-3 gap-2'>
          <div className='flex flex-col col-span-2 gap-2'>
            <p>Address</p>
            <p>
              เลขที่ 352/29 แขวง คลองต้นนุ่น เขตลาดกระบัง กรุงเทพมหานคร 10520
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
            <p>สวัสดีครับพวกเรา Nai_mana_dotshop รับตัดชุด Cosplay ทุกชนิด</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------

export const ReviewCard = ({
  oneStarReviewers,
  twoStarsReviewers,
  threeStarsReviewers,
  fourStarsReviewers,
  fiveStarsReviewers,
  numberOfAllReviewers,
}) => {
  return (
    <div className='mt-8 flex flex-col border-2 p-6 rounded shadow'>
      <p className='text-2xl'>Reviews</p>
      <div className='w-full h-0.5 bg-gray-300' />

      <p className='my-4'>{numberOfAllReviewers} reviews for this dressmaker</p>

      <ReviewRow
        title='5 Stars'
        numberOfReviewers={fiveStarsReviewers}
        numberOfAllReviewers={numberOfAllReviewers}
      />
      <ReviewRow
        title='4 Stars'
        numberOfReviewers={fourStarsReviewers}
        numberOfAllReviewers={numberOfAllReviewers}
      />
      <ReviewRow
        title='3 Stars'
        numberOfReviewers={threeStarsReviewers}
        numberOfAllReviewers={numberOfAllReviewers}
      />
      <ReviewRow
        title='2 Stars'
        numberOfReviewers={twoStarsReviewers}
        numberOfAllReviewers={numberOfAllReviewers}
      />
      <ReviewRow
        title='1 Star'
        numberOfReviewers={oneStarReviewers}
        numberOfAllReviewers={numberOfAllReviewers}
      />
    </div>
  )
}

ReviewCard.propTypes = {
  oneStarReviewers: PropTypes.number.isRequired,
  twoStarsReviewers: PropTypes.number.isRequired,
  threeStarsReviewers: PropTypes.number.isRequired,
  fourStarsReviewers: PropTypes.number.isRequired,
  fiveStarsReviewers: PropTypes.number.isRequired,
  numberOfAllReviewers: PropTypes.number.isRequired,
}

// ----------------------------------------------------------------------

const ReviewRow = ({ title, numberOfReviewers, numberOfAllReviewers }) => {
  const progressPercent = (numberOfReviewers * 100) / numberOfAllReviewers

  return (
    <div className='w-1/2 grid grid-cols-6 gap-2 items-center'>
      <p
        className={cn(
          'whitespace-nowrap col-span-2',
          numberOfReviewers === 0 && 'text-gray-300'
        )}
      >
        {title}
      </p>
      <Progress value={progressPercent} className='mt-1 col-span-3' />
      <p
        className={cn('col-span-1', numberOfReviewers === 0 && 'text-gray-300')}
      >
        ({numberOfReviewers})
      </p>
    </div>
  )
}

ReviewRow.propTypes = {
  title: PropTypes.string.isRequired,
  numberOfReviewers: PropTypes.number.isRequired,
  numberOfAllReviewers: PropTypes.number.isRequired,
}

// ----------------------------------------------------------------------

export const CommentCard = () => {
  return (
    <div className='mt-8 flex flex-col gap-2 border-2 p-6 rounded shadow'>
      <div className='flex items-center gap-2'>
        <img
          src='profile.png'
          alt='profile'
          className='h-12 w-12 rounded-full'
        />

        <div className='flex flex-col'>
          <p>สมบูรณายาสิทธิราช</p>
          <div className='flex items-center gap-2'>
            <StarsRow number={3.5} />
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
  )
}

// ----------------------------------------------------------------------

export const StarsRow = ({ number, className }) => {
  const stars = Math.floor(number) // Full stars
  const halfStar = number - stars > 0 // Check if there's a half star
  const emptyStars = 5 - stars - (halfStar ? 1 : 0) // Calculate remaining empty stars

  return (
    <div className={cn('flex', className)}>
      {/* Render full stars */}
      {Array.from({ length: stars }).map((_, index) => (
        <FaStar key={index} />
      ))}
      {/* Render half star if applicable */}
      {halfStar && <FaStarHalfStroke />}
      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  )
}

StarsRow.propTypes = {
  number: PropTypes.number.isRequired,
  className: PropTypes.string,
}
