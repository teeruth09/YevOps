import React from 'react'
import clock from '../assets/clock.svg';

function ReportReviewSideBar() {

  return (
    <div className='bg-white p-7 h-fit w-full lg:w-[400px] lg:h-[500px] rounded-lg shadow-2xl'>
      <h3 className='font-bold text-lg mb-5'>Basic Package</h3>
      <div className='flex justify-between text-lg mb-5'>
        <p>Simple Sew</p>
        <p>THB ~2,000.00</p>
      </div>
      <div className='mb-7 w-5/6'>
        <p>
          สามารถตัดเย็บได้แบบว้าวซ่าจิงเกอเบล ทำยังไงก็ได้แต่ว่านะ ร้านอาจจะของระยะเวลา ในการทำสักหลายวันเพราะว่าถูกสุด
        </p>
      </div>
      <div className='flex mb-4 gap-x-2'>
        <img src={clock} alt="Clock" width={20} height={20} />
        <p>30 days</p>
      </div>
      <div>
        <ul className='list-disc pl-5'>
          <li>จำนวนชุดสูงสุด 3 ชุด</li>
          <li>ส่งความคืบหน้าทุก ๆ สัปดาห์</li>
          <li>สามารถนัดวัดตัวฟรี</li>
        </ul>
      </div>
    </div>
  )
}

export default ReportReviewSideBar
