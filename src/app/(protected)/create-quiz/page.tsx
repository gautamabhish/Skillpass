//@ts-nocheck
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Rocket, DollarSign, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';
import Image from 'next/image';
import NavbarLogged from '@/components/ui/globals/NavbarLogged';
import { useGetCreations } from '@/hooks/useGetCreations';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type SettlementStatus = 'pending' | 'requested' | 'processing' | 'completed' | 'failed';

type Quiz = {
  id: string;
  title: string;
  price: number;
  purchases: number;
  earnings: number;
};

type PaymentSettlement = {
  id: string;
  amount: number;
  status: SettlementStatus;
  requestedAt?: Date;
  completedAt?: Date;
  // failureReason?: string;
};

const CreateQuizSection: React.FC = () => {
const { data, isLoading, refetch } = useGetCreations();
const quizzes = data?.quizzes ?? [];
const settlements = data?.settlements ?? [];
const [isRequestingSettlement, setIsRequestingSettlement] = useState(false);

const mappedSettlementRequests = useMemo(() => {
  return settlements.map(s => {
    const settledDate = s.settledAt ? new Date(s.settledAt) : null;
    return {
      id: s.id,
      amount: s.amount,
      status: s.settled ? 'completed' : 'requested',
      requestedAt: settledDate,
      completedAt: s.settled ? settledDate : null
    };
  });
}, [settlements]);

const totalEarnings = useMemo(() => {
  return quizzes.reduce((sum, quiz) => sum + quiz.earnings, 0);
}, [quizzes]);



const settledAmount = useMemo(
  () => mappedSettlementRequests
    .filter(req => req.status === 'completed')
    .reduce((sum, req) => sum + req.amount, 0),
  [mappedSettlementRequests]
);

  const pendingAmount = useMemo(
    () => totalEarnings - settledAmount,
    [totalEarnings, settledAmount]
  );

  const topQuizzes = useMemo(
    () => [...quizzes].sort((a, b) => b.earnings - a.earnings).slice(0, 3),
    [quizzes]
  );

  const filteredQuizzes = useMemo(
    () => quizzes.filter((quiz) => !topQuizzes.some((top) => top.id === quiz.id)),
    [quizzes, topQuizzes]
  );

  const chartData = useMemo(() => ({
    labels: quizzes.map((q) => q.title),
    datasets: [
      {
        label: 'Earnings (₹)',
        data: quizzes.map((q) => q.earnings),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 8,
      },
    ],
  }), [quizzes]);

  const handleSettlementRequest = async () => {
    if (pendingAmount <= 0) return;
    setIsRequestingSettlement(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/QuizSettlementRequested`,
        {},
        { withCredentials: true }
      );

      // After successful request, refetch data to update settlements
      await refetch();

    } catch (error) {
      console.error('Settlement request failed:', error);
      alert('Settlement request failed. Please try again later.');
    } finally {
      setIsRequestingSettlement(false);
    }
  };

  const getStatusIcon = (status: SettlementStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'requested': return <Send className="w-4 h-4 text-blue-500" />;
      case 'processing': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: SettlementStatus) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'requested': return 'Requested';
      case 'processing': return 'Processing';
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: SettlementStatus) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'requested': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
  <>
  <NavbarLogged />
  <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 py-8 sm:px-6 lg:px-12">
    <div className="max-w-7xl mx-auto">

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="text-center bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Total Earnings</h2>
          <p className="text-xl sm:text-2xl text-blue-600 font-bold mt-2">₹{totalEarnings}</p>
        </div>
        <div className="text-center bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Settled Amount</h2>
          <p className="text-xl sm:text-2xl text-green-600 font-bold mt-2">₹{settledAmount}</p>
        </div>
        <div className="text-center bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Pending Settlement</h2>
          <p className="text-xl sm:text-2xl text-orange-600 font-bold mt-2">₹{pendingAmount}</p>
        </div>
      </div>

      {/* Settlement Request */}
      {pendingAmount > 0 && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Request Settlement</h3>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                You have ₹{pendingAmount} available for settlement
              </p>
            </div>
            <button
              onClick={handleSettlementRequest}
              disabled={isRequestingSettlement || pendingAmount <= 0}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isRequestingSettlement ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Requesting...
                </>
              ) : (
                <>
                  <DollarSign size={16} /> Request Settlement
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Settlement History */}
      {mappedSettlementRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-10">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Settlement History</h3>
          <div className="space-y-4">
            {mappedSettlementRequests.map((settlement) => (
              <div
                key={settlement.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg bg-gray-50 gap-2"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {getStatusIcon(settlement.status)}
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">₹{settlement.amount}</p>
                    {settlement.requestedAt && (
                      <p className="text-xs sm:text-sm text-gray-500">
                        Requested on {settlement.requestedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(settlement.status)}`}
                  >
                    {getStatusIcon(settlement.status)}
                    {getStatusText(settlement.status)}
                  </span>
                  {settlement.completedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      Completed on {settlement.completedAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
      {quizzes.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Earnings Breakdown</h2>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <Bar 
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>
      )}

      {/* Create Quiz Button */}
      <div className="flex justify-center my-8">
        <Link
          href="/create-quiz/dereq"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          <Rocket size={18} /> Create Quiz
        </Link>
      </div>

      {/* Quizzes */}
      {quizzes.length > 0 ? (
        <>
          {topQuizzes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Top Performing Quizzes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-xl p-4 sm:p-6 shadow-md border hover:shadow-lg transform hover:-translate-y-1 transition"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Purchases: {quiz.purchases}</p>
                    <p className="text-sm text-blue-700 mt-1 font-semibold">Earnings: ₹{quiz.earnings}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredQuizzes.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Your Quizzes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-xl p-4 sm:p-6 shadow-md border hover:shadow-lg transform hover:-translate-y-1 transition"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Purchases: {quiz.purchases}</p>
                    <p className="text-sm text-green-700 mt-1 font-semibold">Earnings: ₹{quiz.earnings}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        !isLoading && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border max-w-lg mx-auto mt-10">
            <div className="flex justify-center mb-4">
              <Image src="/no.png" alt="No quiz" width={200} height={200} />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-2">
              Present is the best time to start!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              You haven't created any quizzes yet. Let's get started and make something awesome!
            </p>
            <Link
              href="/create-quiz/dereq"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              <Rocket size={18} /> Create Your First Quiz
            </Link>
          </div>
        )
      )}
    </div>
  </div>
</>

  );
};

export default CreateQuizSection;
