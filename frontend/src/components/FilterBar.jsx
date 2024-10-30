import DropdownForFilterBar from './DropdownForFilterBar'

const VerifiedOption = ['Yes', 'No']
const GenreOption = [
  'Suits',
  'Wedding',
  'Formal Dress',
  'Police',
  'Cosplay',
  'Others',
]

const Filterbar = () => {
  const bottomShadowStyle = {
    boxShadow: '0 8px 14px rgba(255, 68, 67, 0.15)',
  }

  return (
    <div
      style={bottomShadowStyle}
      className='w-full pb-12 mb-12 sticky top-[60px] z-10 bg-white'
    >
      <div className='w-full max-w-5xl h-full flex flex-col sm:flex-row justify-around items-end m-auto sm:px-4 px-16 sm:gap-8'>
        {/* Verified Dropdown */}
        <div className='w-full sm:w-[250px] h-3/5 my-2 sm:my-0'>
          <p className='text-lg font-medium h-1/2 flex items-center'>
            Shop Verified
          </p>
          <DropdownForFilterBar options={VerifiedOption} placeHolder='Any' />
        </div>

        {/* Budget Input */}
        <div className='w-full sm:w-[250px] h-3/5 my-2 sm:my-0'>
          <p className='text-lg font-medium h-1/2 flex items-center'>Budget</p>
          <input
            className='h-1/2 w-full border-b border-red-300 text-left text-2xl font-bold focus:outline-none mt-1'
            type='number'
            min='0'
            max='999999'
            step='1000'
            placeholder='Any'
          />
        </div>

        {/* Genre Dropdown */}
        <div className='w-full sm:w-[250px] h-3/5 my-2 sm:my-0'>
          <p className='text-lg font-medium h-1/2 flex items-center'>Genre</p>
          <DropdownForFilterBar options={GenreOption} placeHolder='Any' />
        </div>
      </div>
    </div>
  )
}

export default Filterbar
