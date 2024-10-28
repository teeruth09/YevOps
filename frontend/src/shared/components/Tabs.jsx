/* eslint-disable react/prop-types */
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className='flex border-b h-full w-full px-12 bg-white shadow-xl rounded-lg my-3'>
      {/* Distribute each tab button equally across the full width of the container */}
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-1 py-2 focus:outline-none text-center ${
            activeTab === tab
              ? 'text-black border-b-2 border-red-600'
              : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default Tabs
