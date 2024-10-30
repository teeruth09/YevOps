/* eslint-disable react/prop-types */
import { FaAngleLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

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

export const PrimaryButton = ({ children, onClick, className, type }) => {
  return (
    <button
      className={cn(
        'py-3 w-full shadow-xl bg-red-500 text-white text-xl font-medium flex items-center justify-center rounded-lg hover:bg-red-700',
        className
      )}
      onClick={onClick}
      type={type ?? 'button'}
    >
      {children}
    </button>
  )
}

export const SecondaryButton = ({ children, onClick, className }) => {
  return (
    <button
      className={cn(
        'w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border py-3 rounded-lg text-xl font-medium flex items-center justify-center',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
