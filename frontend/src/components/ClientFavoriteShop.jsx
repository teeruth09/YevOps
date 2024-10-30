/* eslint-disable react/prop-types */
const FavoriteShop = ({
  previewImage,
  shopProfile,
  shopName,
  shopRating,
  reviewCount,
  shopDescription,
  startBudget,
  stopBudget,
}) => {
  const max3lines = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  return (
    <div className='flex flex-col items-center m-2 w-[250px] h-[360px] rounded-sm border-[2px]'>
      {/* Shop preview picture */}
      <img
        className='mt-2 w-[230px] h-[120px] rounded-md'
        src={previewImage}
        alt='preview'
      />
      {/* Shop pfp, name, rating */}
      <div className='flex justify-start relative mt-3 w-[230px] h-[40px]'>
        <img
          className='w-[32px] h-[32px] rounded-full'
          src={shopProfile}
          alt=''
        />
        <div className='flex flex-col ml-2 w-40'>
          <div className='flex justify-start items-center h-[16px]'>
            <p className='text-sm font-semibold'>{shopName}</p>
            <img
              className='w-[16px] h-[16px] ml-1'
              src='https://cdn-icons-png.flaticon.com/128/11412/11412145.png'
              alt=''
            />
          </div>
          <div className='flex justify-start items-center h-[16px]'>
            <img
              className='w-[12px] h-[12px]'
              src='https://cdn-icons-png.flaticon.com/128/2893/2893811.png'
              alt=''
            />
            <img
              className='w-[12px] h-[12px]'
              src='https://cdn-icons-png.flaticon.com/128/2893/2893811.png'
              alt=''
            />
            <img
              className='w-[12px] h-[12px]'
              src='https://cdn-icons-png.flaticon.com/128/2893/2893811.png'
              alt=''
            />
            <img
              className='w-[12px] h-[12px]'
              src='https://cdn-icons-png.flaticon.com/128/2893/2893811.png'
              alt=''
            />
            <img
              className='w-[12px] h-[12px]'
              src='https://cdn-icons-png.flaticon.com/128/2893/2893811.png'
              alt=''
            />
            <p className='text-xs font-medium ml-1 text-gray-400'>
              {shopRating} ({reviewCount})
            </p>
          </div>
        </div>
        <div className='absolute top-0 right-1'>
          <img
            className='w-[14px] h-[14px]'
            src='https://cdn-icons-png.flaticon.com/128/151/151910.png'
            alt=''
          />
        </div>
      </div>
      {/* Shop description 3 lines */}
      <div style={max3lines} className='w-[230px] h-[50px] mt-2 text-xs'>
        {shopDescription}
      </div>
      {/* Budget */}
      <p className='w-[230px] mt-2 text-xl font-bold'>
        {startBudget} - {stopBudget} THB
      </p>
    </div>
  )
}

const ClientFavoriteShop = () => {
  return (
    <div className='px-5 w-full'>
      <div className='py-3 text-3xl font-semibold mb-8'>My Favorite Shop</div>
      <div className='grid grid-cols-3 gap-4'>
        <FavoriteShop
          previewImage='https://i.imgur.com/SjjJVdY.png'
          shopProfile='https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg'
          shopName='Hinoshii is cool'
          shopRating='5.0'
          reviewCount='1384'
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget='2100'
          stopBudget='999999'
        />
        <FavoriteShop
          previewImage='https://i.imgur.com/SjjJVdY.png'
          shopProfile='https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg'
          shopName='Read this is gay'
          shopRating='5.0'
          reviewCount='1384'
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget='2100'
          stopBudget='999999'
        />
        <FavoriteShop
          previewImage='https://i.imgur.com/SjjJVdY.png'
          shopProfile='https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg'
          shopName='Hinoshii is cool'
          shopRating='5.0'
          reviewCount='1384'
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget='2100'
          stopBudget='999999'
        />
        <FavoriteShop
          previewImage='https://i.imgur.com/SjjJVdY.png'
          shopProfile='https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg'
          shopName='Never gonna give'
          shopRating='5.0'
          reviewCount='1384'
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget='2100'
          stopBudget='999999'
        />
        <FavoriteShop
          previewImage='https://i.imgur.com/SjjJVdY.png'
          shopProfile='https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg'
          shopName='Hinoshii is cool'
          shopRating='5.0'
          reviewCount='1384'
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget='2100'
          stopBudget='999999'
        />
        <FavoriteShop
          previewImage='https://i.imgur.com/SjjJVdY.png'
          shopProfile='https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg'
          shopName='Hinoshii is cool'
          shopRating='5.0'
          reviewCount='1384'
          shopDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          startBudget='2100'
          stopBudget='999999'
        />
      </div>
    </div>
  )
}

export default ClientFavoriteShop
