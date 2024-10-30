import { cn } from '@/lib/utils'

/* eslint-disable react/prop-types */
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className='flex border-b h-full w-full lg:px-3 bg-white shadow-xl rounded-lg my-3'>
      {/* Distribute each tab button equally across the full width of the container */}
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={cn(
            'flex-1 py-2 focus:outline-none text-center md:block flex',
            activeTab === tab.name
              ? 'text-black border-b-2 border-red-600'
              : 'text-gray-600 hover:text-black'
          )}
          onClick={() => setActiveTab(tab.name)}
        >
          {/* Show name on md and up, icon on smaller screens */}
          <span className='hidden md:inline text-sm lg:text-base'>
            {tab.name}
          </span>
          <span className='md:hidden ml-auto mr-auto'>{tab.icon}</span>
        </button>
      ))}
    </div>
  )
}

export default Tabs
