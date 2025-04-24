import Link from 'next/link'
import React from 'react'
const Navbar = () => {
  return (
    <div>

        <div  className='flex justify-between items-center py-1'>
            <ul className='flex p-4 ml-12 gap-12 items-center'>
                <li className='text-[#1658e7e8] font-semibold text-2xl pr-2.5'>EduTrust</li>
               <ul className='flex gap-12 items-center  ml-4 text-[#616975] '>
               <li className='hover:text-slate-700'><Link href={"/explore"}>Explore</Link></li>
                <li className='hover:text-slate-700'><Link href={"/create-quiz"}>Create Test</Link></li>
                <li className='hover:text-slate-700 '><Link href='/about'>About</Link></li>
               </ul>
            </ul>
            <div className='flex px-12 py-2 gap-6 items-center'>
            <Link href="/sign-in" >Login</Link>
            <Link href={'/sign-in'} className='bg-[#2563eb] px-5 py-3 text-white rounded-2xl'>Sign Up</Link>
        </div>

        </div>
        
    </div>
  )
}

export default Navbar