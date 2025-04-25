import React from 'react';
import Link from 'next/link';
const Started = () => {
  return (
    <div className='bg-[#f5f5f5] p-2'>


    <section className="flex justify-center items-center m-8 bg-[rgb(37,99,235)] rounded-xl ">
      <div className="max-w-xl flex flex-col items-center text-center py-8 gap-6">
        <h1 className="text-3xl text-white font-bold ">
          Ready to Prove Your Knowledge?
        </h1>
        <p className="text-xs text-white ">
          Join thousands of learners who have verified their skills through EduTrust.
        </p>
        <Link href='/explore' className=" py-3 px-4 bg-white text-blue-500 font-semibold rounded ">
          Get Started Now
        </Link>
      </div>
    </section>
    </div>
  );
};

export default Started;
