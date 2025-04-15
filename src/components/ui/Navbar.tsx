import React from 'react'

const Navbar = () => {
  return (
    <div>

        <div  className='flex justify-between items-center py-1'>
            <ul className='flex p-4 ml-12 gap-12 items-center'>
                <li className='text-[#1658e7e8] font-semibold text-2xl pr-2.5'>EduTrust</li>
               <ul className='flex gap-12 items-center  ml-4 text-[#616975] '>
               <li className='hover:text-slate-700'>Explore</li>
                <li className='hover:text-slate-700'>Create Test</li>
                <li className='hover:text-slate-700'>About</li>
               </ul>
            </ul>
            <div className='flex px-12 py-2 gap-6 items-center'>
            <div>Login</div>
            <button className='bg-[#2563eb] px-5 py-3 text-white rounded-2xl'>Sign Up</button>
        </div>

        </div>
        
    </div>
  )
}

export default Navbar