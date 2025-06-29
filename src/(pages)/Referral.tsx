'use client';

import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import NavbarLogged from '@/components/ui/globals/NavbarLogged';
import sharenearn from '../../public/sharenearn.png';
import { useReferral } from '@/hooks/useReferral';
import Link from 'next/link';
import axios from 'axios';

interface Referral {
  id: string;
  referredUserName: string | null;
  quizTitle: string;
  earnedAmount: number;
  createdAt: string;
  settledAt: string | null;
  redeemed: boolean;
}

const ReferralEarningsPage: React.FC = () => {
  const { data, isLoading, refetch } = useReferral();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  useEffect(() => {
    if (data && Array.isArray(data.referrals)) {
      setReferrals(data.referrals);
      const total = data.referrals.reduce((sum: number, item: Referral) => sum + item.earnedAmount, 0);
      setTotalEarnings(total);
    }
  }, [data]);

  const handleRedeem = async (referralId: string) => {
    try {
     window.open('https://forms.gle/NFkaNV2qkgrHWgaLA', '_blank');
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/redeemStatusCheck`, { referralId }, { withCredentials: true });
      refetch(); // update list after redeem
    } catch (err) {
      console.error('Failed to redeem:', err);
      alert('Failed to redeem. Please try again.');
    }
  };

  return (
    <div>
      <NavbarLogged />

      <div className="relative flex min-h-screen flex-col bg-[#f8f9fc] overflow-x-hidden" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
        <div className="flex flex-col w-full max-w-6xl mx-auto p-4">
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-[#0c111c] text-2xl md:text-3xl font-bold">Referral Earnings</p>
            <p className="text-[#4662a0] text-sm">Track your referral earnings and invite more friends to join our platform.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 bg-white rounded-xl shadow-sm p-4">
              <p className="text-[#0c111c] font-bold">Total Referral Earnings</p>
              <p className="text-[#155efc] text-xl font-bold">
                <FaRupeeSign className="inline mr-1" />
                {totalEarnings.toFixed(2)}
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${sharenearn.src})`, minHeight: '150px' }}></div>
          </div>

          <div className="overflow-auto rounded-xl border border-[#cdd6e9] bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-[#f8f9fc]">
                <tr>
                  <th className="p-2 text-left">Referral ID</th>
                  <th className="p-2 text-left">Referred User</th>
                  <th className="p-2 text-left">Quiz</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Earnings</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={7} className="p-4 text-center text-[#4662a0]">Loading...</td></tr>
                ) : referrals.length === 0 ? (
                  <tr><td colSpan={7} className="p-4 text-center text-[#4662a0]">No referrals yet.</td></tr>
                ) : (
                  referrals.map((ref) => (
                    <tr key={ref.id} className="border-t">
                      <td className="p-2 break-all">{ref.id}</td>
                      <td className="p-2">{ref.referredUserName || 'Guest'}</td>
                      <td className="p-2">{ref.quizTitle}</td>
                      <td className="p-2">{new Date(ref.createdAt).toLocaleDateString()}</td>
                      <td className="p-2">
                        <FaRupeeSign className="inline mr-1" />
                        {ref.earnedAmount.toFixed(2)}
                      </td>
                      <td className="p-2">
                        {ref.settledAt ? (
                          <span className="text-green-600">Settled</span>
                        ) : ref.redeemed ? (
                          <span className="text-yellow-600">Pending Settlement</span>
                        ) : (
                          <span className="text-gray-500">Not Redeemed</span>
                        )}
                      </td>
                      <td className="p-2">
                        {!ref.redeemed && !ref.settledAt && (
                          <button
                            className="px-3 py-1 bg-[#155efc] text-white rounded-full text-xs"
                            onClick={() => handleRedeem(ref.id)}
                          >
                            Redeem
                          </button>
                        )}
                        {ref.redeemed && !ref.settledAt && (
                          <span className="text-xs text-yellow-600">Requested</span>
                        )}
                        {ref.settledAt && (
                          <span className="text-xs text-green-600">{new Date(ref.settledAt).toLocaleDateString()}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <Link href="/explore">
              <button className="rounded-full h-10 px-4 bg-[#155efc] text-white text-sm font-bold">
                Invite More Friends
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralEarningsPage;
