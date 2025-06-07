'use client';

import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import NavbarLogged from '@/components/ui/globals/NavbarLogged';
import sharenearn from '../../public/sharenearn.png';
import { useReferral } from '@/hooks/useReferral';
import Link from 'next/link';
interface Referral {
  referredUser: { name: string } | null;
  quiz: { title: string };
  earnedAmount: number;
  createdAt: string;
}

const ReferralEarningsPage: React.FC = () => {
  const { data, isLoading } = useReferral();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setReferrals(data);
      const total = data.reduce((sum, item) => sum + item.earnedAmount, 0);
      setTotalEarnings(total);
    }
  }, [data]);

  return (
    <div>
      <NavbarLogged />

      <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] overflow-x-hidden" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

              {/* Header */}
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-[#0c111c] tracking-light text-[32px] font-bold leading-tight">Referral Earnings</p>
                  <p className="text-[#4662a0] text-sm font-normal leading-normal">Track your referral earnings and invite more friends to join our platform.</p>
                </div>
              </div>

              {/* Total Earnings */}
              <div className="p-4">
                <div className="flex items-stretch justify-between gap-0 rounded-xl">
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
                  />
                </div>
              </div>

              {/* Referral Table */}
              <h2 className="text-[#0c111c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recent Referrals</h2>
              <div className="px-4 py-3 @container">
                <div className="flex overflow-hidden rounded-xl border border-[#cdd6e9] bg-[#f8f9fc]">
                  <table className="flex-1">
                    <thead>
                      <tr className="bg-[#f8f9fc]">
                        <th className="px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium">Referred User</th>
                        <th className="px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium">Quiz Title</th>
                        <th className="px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-[#0c111c] w-[400px] text-sm font-medium">Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr><td colSpan={4} className="text-center py-4 text-[#4662a0]">Loading...</td></tr>
                      ) : referrals.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-4 text-[#4662a0]">No referrals yet.</td></tr>
                      ) : (
                        referrals.map((ref, idx) => (
                          <tr key={idx} className="border-t border-t-[#cdd6e9]">
                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#0c111c] text-sm font-normal">{ref.referredUser?.name || "Guest"}</td>
                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#4662a0] text-sm font-normal">{ref.quiz.title}</td>
                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#4662a0] text-sm font-normal">{new Date(ref.createdAt).toLocaleDateString()}</td>
                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#4662a0] text-sm font-normal">
                              <FaRupeeSign className="inline mr-1" />
                              {ref.earnedAmount.toFixed(2)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Invite Button */}
              <Link href="/explore" className="flex px-4 py-6 justify-center cursor-pointer">
                <button className="rounded-full h-10 px-4 bg-[#155efc] text-white text-sm font-bold cursor-pointer" >
                  Invite More Friends
                </button>
            </Link>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralEarningsPage;
