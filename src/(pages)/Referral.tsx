'use client';

import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import Link from 'next/link';

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

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Your Referral Earnings</h1>
          <p className="text-gray-500 mt-1">Track how much you’ve earned by referring users</p>
        </div>

        {/* Earnings Summary Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center border border-gray-100">
          <div>
            <p className="text-gray-500">Total Earnings</p>
            <h2 className="text-3xl font-bold text-green-600 flex items-center">
              <FaRupeeSign className="mr-2" />
              {totalEarnings.toFixed(2)}
            </h2>
          </div>
          <Link
            href="/associate/program"
            className="text-sm text-blue-600 underline hover:text-blue-800 transition"
          >
            View Associate Program
          </Link>
        </div>

        {/* Referral List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Referral History</h3>
          {referrals.length === 0 ? (
            <p className="text-center text-gray-500">No referral data available.</p>
          ) : (
            referrals.map((ref, index) => (
              <div
                key={index}
                className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-100"
              >
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">
                    {new Date(ref.createdAt).toLocaleDateString()}
                  </p>
                  <p className="font-medium text-gray-800">
                    <span className="text-blue-600">{ref.quiz.title}</span> —
                    referred <span className="text-gray-700">{ref.referredUser?.name || 'Guest'}</span>
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-green-600 font-bold text-lg flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {ref.earnedAmount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralEarningsPage;
