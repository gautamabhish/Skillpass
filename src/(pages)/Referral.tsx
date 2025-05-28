'use client';

import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import Link from 'next/link';
import sharenearn from '../../public/sharenearn.png';
import Navbar from '@/components/ui/globals/Navbar'
import NavbarLogged from '@/components/ui/globals/NavbarLogged';

interface Referral {
  referredUser: { name: string } | null;
  quiz: { title: string };
  earnedAmount: number;
  createdAt: string;
}

const ReferralEarningsPage: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  useEffect(() => {
    const dummyData: Referral[] = [
      {
        referredUser: { name: 'Alice Smith' },
        quiz: { title: 'General Knowledge Quiz' },
        earnedAmount: 50,
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
      {
        referredUser: { name: 'Bob Johnson' },
        quiz: { title: 'Science Challenge' },
        earnedAmount: 75.5,
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      },
      {
        referredUser: null,
        quiz: { title: 'Math Whiz' },
        earnedAmount: 30.25,
        createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
      },
      {
        referredUser: { name: 'Charlie Brown' },
        quiz: { title: 'History Buff' },
        earnedAmount: 120,
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ];

    setReferrals(dummyData);
    setTotalEarnings(dummyData.reduce((sum, r) => sum + r.earnedAmount, 0));
  }, []);


  const referralLink = "https://yourapp.com/referral/your-code";

  return (
    // <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-4">
    //   <div className="max-w-5xl mx-auto space-y-8">
    //     {/* Header */}
    //     <div className="text-center">
    //       <h1 className="text-3xl font-bold text-gray-800">Your Referral Earnings</h1>
    //       <p className="text-gray-500 mt-1">Track how much you’ve earned by referring users</p>
    //     </div>

    //     {/* Earnings Summary Card */}
    //     <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center border border-gray-100">
    //       <div>
    //         <p className="text-gray-500">Total Earnings</p>
    //         <h2 className="text-3xl font-bold text-green-600 flex items-center">
    //           <FaRupeeSign className="mr-2" />
    //           {totalEarnings.toFixed(2)}
    //         </h2>
    //       </div>
    //       <Link
    //         href="/associate/program"
    //         className="text-sm text-blue-600 underline hover:text-blue-800 transition"
    //       >
    //         View Associate Program
    //       </Link>
    //     </div>

    //     {/* Referral List */}
    //     <div className="space-y-4">
    //       <h3 className="text-xl font-semibold text-gray-700">Referral History</h3>
    //       {referrals.length === 0 ? (
    //         <p className="text-center text-gray-500">No referral data available.</p>
    //       ) : (
    //         referrals.map((ref, index) => (
    //           <div
    //             key={index}
    //             className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-100"
    //           >
    //             <div className="space-y-1">
    //               <p className="text-sm text-gray-400">
    //                 {new Date(ref.createdAt).toLocaleDateString()}
    //               </p>
    //               <p className="font-medium text-gray-800">
    //                 <span className="text-blue-600">{ref.quiz.title}</span> —
    //                 referred <span className="text-gray-700">{ref.referredUser?.name || 'Guest'}</span>
    //               </p>
    //             </div>
    //             <div className="mt-2 sm:mt-0 text-green-600 font-bold text-lg flex items-center">
    //               <FaRupeeSign className="mr-1" />
    //               {ref.earnedAmount.toFixed(2)}
    //             </div>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div>

    
    <NavbarLogged></NavbarLogged>
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] group/design-root overflow-x-hidden" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#0c111c] tracking-light text-[32px] font-bold leading-tight">Referral Earnings</p>
                <p className="text-[#4662a0] text-sm font-normal leading-normal">Track your referral earnings and invite more friends to join our platform.</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between  gap-0 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#0c111c] text-base font-bold leading-tight">Total Referral Earnings</p>
                  <p className="text-[#4662a0] text-sm font-normal leading-normal">
                    <FaRupeeSign className="inline mr-1" />
                    {totalEarnings.toFixed(2)}
                  </p>
                </div>
                <div
                  className="w-full h-52 bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: `url(${sharenearn.src})` }}
                ></div>
              </div>
            </div>
            <h2 className="text-[#0c111c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Share Your Referral Link</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-xl">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0c111c] focus:outline-0 focus:ring-0 border border-[#cdd6e9] bg-[#f8f9fc] focus:border-[#cdd6e9] h-14 placeholder:text-[#4662a0] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    value={referralLink}
                    readOnly
                  />
                  <div
                    className="text-[#4662a0] flex border border-[#cdd6e9] bg-[#f8f9fc] items-center justify-center pr-[15px] rounded-r-xl border-l-0 cursor-pointer"
                    title="Copy referral link"
                    onClick={() => {
                      navigator.clipboard.writeText(referralLink);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            <h2 className="text-[#0c111c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recent Referrals</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#cdd6e9] bg-[#f8f9fc]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#f8f9fc]">
                      <th className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-120 px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium leading-normal">
                        Referred User
                      </th>
                      <th className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-240 px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium leading-normal">
                        Quiz Title
                      </th>
                      <th className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-360 px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium leading-normal">Date</th>
                      <th className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-480 px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium leading-normal">
                        Earnings
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-[#4662a0]">No referrals yet.</td>
                      </tr>
                    ) : (
                      referrals.map((ref, idx) => (
                        <tr key={idx} className="border-t border-t-[#cdd6e9]">
                          <td className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0c111c] text-sm font-normal leading-normal">
                            {ref.referredUser?.name || "Guest"}
                          </td>
                          <td className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4662a0] text-sm font-normal leading-normal">
                            {ref.quiz.title}
                          </td>
                          <td className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-360 h-[72px] px-4 py-2 w-[400px] text-[#4662a0] text-sm font-normal leading-normal">
                            {new Date(ref.createdAt).toLocaleDateString()}
                          </td>
                          <td className="table-bcd2384a-9bdb-4052-8809-ca025388d699-column-480 h-[72px] px-4 py-2 w-[400px] text-[#4662a0] text-sm font-normal leading-normal">
                            <FaRupeeSign className="inline mr-1" />
                            {ref.earnedAmount.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <style>
                {`
                  @container(max-width:120px){.table-bcd2384a-9bdb-4052-8809-ca025388d699-column-120{display: none;}}
                  @container(max-width:240px){.table-bcd2384a-9bdb-4052-8809-ca025388d699-column-240{display: none;}}
                  @container(max-width:360px){.table-bcd2384a-9bdb-4052-8809-ca025388d699-column-360{display: none;}}
                  @container(max-width:480px){.table-bcd2384a-9bdb-4052-8809-ca025388d699-column-480{display: none;}}
                `}
              </style>
            </div>
            <div className="flex px-4 py-3 justify-center">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#155efc] text-[#f8f9fc] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Invite More Friends</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReferralEarningsPage;
