import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../navbar/Sidebar'
import { Drawer } from '@mui/material'
import { useContext } from 'react'
import { SidebarContext } from '../contexts/SidebarProvider'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import { FaAngleRight, FaTimes } from 'react-icons/fa'
import { clientSideLinks, shopSideLinks } from '../navbar/links.constant'

const ProfileLayout = () => {
  const location = useLocation()
  const role = localStorage.getItem('role')
  const { sidebar: drawer } = useContext(SidebarContext)

  return (
    <div className='flex min-h-screen w-full'>
      <div className='hidden sm:block'>
        <Sidebar isClient={role === 'client'} />
      </div>

      <div className='sm:mr-32 md:mr-[240px] lg:mr-[300px]' />
      <div className='flex-grow flex justify-center h-full px-10 py-10'>
        <Outlet />
      </div>

      <Drawer
        open={drawer.value}
        onClose={drawer.setFalse}
        sx={{
          width: '100%',
          height: '100%',
          '& .MuiDrawer-paper': {
            width: '100%',
            height: '100%',
          },
        }}
      >
        <div className='flex flex-col h-full gap-4 p-4'>
          <button onClick={drawer.setFalse} className='mr-auto text-lg'>
            <FaTimes size={24} /> {/* Cross icon for closing */}
          </button>
          <div className='flex-grow overflow-y-auto'>
            {role === 'client'
              ? clientSideLinks.map((link) => (
                  <div key={link.link}>
                    <NavLink
                      to={link.link}
                      onClick={drawer.setFalse} // Close drawer on click
                    >
                      <div className='flex justify-between items-center py-4 px-2 border-b'>
                        <div className='flex items-center space-x-3 w-full'>
                          {link.icon}
                          <span
                            className={cn(
                              'text-gray-700',
                              location.pathname === link.link && 'font-bold'
                            )}
                          >
                            {link.name}
                          </span>
                        </div>
                        <FaAngleRight className='ml-auto' />
                      </div>
                    </NavLink>
                  </div>
                ))
              : shopSideLinks.map((link) => (
                  <div key={link.link}>
                    <NavLink
                      to={link.link}
                      onClick={drawer.setFalse} // Close drawer on click
                    >
                      <div className='flex justify-between items-center py-4 px-2 border-b'>
                        <div className='flex items-center space-x-3 w-full'>
                          {link.icon}
                          <span
                            className={cn(
                              'text-gray-700',
                              location.pathname === link.link && 'font-bold'
                            )}
                          >
                            {link.name}
                          </span>
                        </div>
                        <FaAngleRight className='ml-auto' />
                      </div>
                    </NavLink>
                  </div>
                ))}
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default ProfileLayout
