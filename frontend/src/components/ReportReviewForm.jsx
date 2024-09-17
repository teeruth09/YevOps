import React from 'react'

function ReportReviewForm() {
  return (
    <div className='w-full flex justify-center bg-gray-200 md:mt-3 shadow-2xl'>
      <form className='w-full h-fit'>
        <textarea  className='resize-y overflow-auto m-4 p-5 border-2 border-gray-400 w-[95%]' rows="10"></textarea>
        <div className="flex justify-end space-x-6 px-5 pb-5">
            <button className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-lg">
                Cancel
            </button>
            <button className="bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow-lg">
                Submit
            </button>
    </div>
      </form>
    </div>
  )
}

export default ReportReviewForm
