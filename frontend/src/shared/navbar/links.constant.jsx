import { FaFolder, FaHeart, FaHistory, FaEdit, FaLock } from 'react-icons/fa'
import { BsBank2 } from 'react-icons/bs'
import {
  FaStore,
  FaCheckCircle,
  FaInfoCircle,
  FaClipboardCheck,
} from 'react-icons/fa' // Import relevant icons

export const guestLinks = [
  {
    link: '/applyshop',
    name: 'Open a shop',
    icon: <FaStore size={20} />, // Store icon for opening a shop
  },
]

export const clientLinks = [
  {
    link: '/post',
    name: 'Post',
    icon: <FaClipboardCheck size={20} />, // Icon for creating or checking posts
  },
  {
    link: '/design',
    name: 'Design by AI',
    icon: <FaInfoCircle size={20} />, // Icon representing information
  },
  {
    link: '/applyshop',
    name: 'Open a shop',
    icon: <FaStore size={20} />, // Icon for opening a shop
  },
]

export const shopLinks = [
  {
    link: '/verifyshop',
    name: 'Verify your shop',
    icon: <FaCheckCircle size={20} />, // Check circle icon for verification
  },
]

export const clientSideLinks = [
  {
    link: '/client/profile/post',
    icon: <FaFolder className='text-gray-600' size={20} />,
    name: 'My Posts',
  },
  {
    link: '/client/profile/favorites',
    icon: <FaHeart className='text-gray-600' size={20} />,
    name: 'My Favorite Shop',
  },
  {
    link: '/client/profile/history',
    icon: <FaHistory className='text-gray-600' size={20} />,
    name: 'Purchase History',
  },
  {
    link: '/client/profile',
    icon: <FaEdit className='text-gray-600' size={20} />,
    name: 'Edit Profile',
  },
  {
    link: '/client/profile/bank',
    icon: <BsBank2 className='text-gray-600' size={20} />,
    name: 'Bank Accounts',
  },
  {
    link: '/client/profile/password',
    icon: <FaLock className='text-gray-600' size={20} />,
    name: 'Change Password',
  },
]

export const shopSideLinks = [
  {
    link: '/shop/profile/post',
    icon: <FaEdit className='text-gray-600' size={20} />,
    name: 'Edit Shop',
  },
  {
    link: '/shop/profile/reviews',
    icon: <FaHeart className='text-gray-600' size={20} />,
    name: 'Review History',
  },
  {
    link: '/shop/profile/order',
    icon: <FaHistory className='text-gray-600' size={20} />,
    name: 'Order History',
  },
  {
    link: '/shop/profile',
    icon: <FaEdit className='text-gray-600' size={20} />,
    name: 'Edit Profile',
  },
  {
    link: '/shop/profile/bank',
    icon: <BsBank2 className='text-gray-600' size={20} />,
    name: 'Bank Accounts',
  },
  {
    link: '/shop/profile/password',
    icon: <FaLock className='text-gray-600' size={20} />,
    name: 'Change Password',
  },
]
