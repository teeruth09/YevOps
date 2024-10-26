import { FaAngleLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

// eslint-disable-next-line react/prop-types
export const BackButton = ({ container = false, containerStyle }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(-1)}
      className={cn(
        'flex w-fit h-full cursor-pointer',
        container &&
          'flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer',
        containerStyle
      )}
    >
      <FaAngleLeft className='text-gray-600 h-6 w-6' />
    </div>
  )
}
