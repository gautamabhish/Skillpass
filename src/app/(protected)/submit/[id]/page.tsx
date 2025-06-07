'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import * as Chart from 'chart.js/auto';
import {
  FaTrophy,
  FaUsers,
  FaPercentage,
  FaDownload,
  FaChartBar,
} from 'react-icons/fa';
import Link from 'next/link';

export default function SubmissionDetailPage() {
  const { id: attemptId } = useParams() as { id: string };
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const comparisonChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart.Chart | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('submissionData');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.userAttempt?.id === attemptId) {
          setData(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Failed to parse submissionData from localStorage', e);
      }
    }

    axios
      .get(`http://localhost:5000/api/quiz/fetch/${attemptId}`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        localStorage.setItem('submissionData', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [attemptId]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    if (data && comparisonChartRef.current) {
      const ctx = comparisonChartRef.current.getContext('2d');
      if (ctx) {
        const { userAttempt, peerStats } = data;
        const chart = new Chart.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Your Score', 'Average Score', 'Highest Score'],
            datasets: [
              {
                label: 'Percentage',
                data: [
                  userAttempt.score,
                  peerStats.averageScore,
                  peerStats.highestScore,
                ],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
                borderRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: { stepSize: 10 },
                title: { display: true, text: 'Score ' },
              },
            },
          },
        });
        chartInstanceRef.current = chart;
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500 animate-pulse">Loading submission...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold mb-4">Submission not found.</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    userAttempt,
    quizTitle,
    peerStats,
    topAttempts,
    certificateIssued,
    certificateId,
  } = data;

  const started = new Date(userAttempt.startedAt).toLocaleString();
  const finished = new Date(userAttempt.finishedAt).toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-900 to-[#2563eb]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {quizTitle}
          </h1>
          <div className="flex justify-center items-center gap-6 text-blue-200 flex-wrap">
            <div className="flex items-center gap-2">
              <FaUsers className="text-xl" />
              <span className="text-sm">Total Attempts: {peerStats.totalAttempts}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPercentage className="text-xl" />
              <span className="text-sm">Avg Score: {peerStats.averageScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTrophy className="text-xl" />
              <span className="text-sm">Your Rank: {peerStats.rank}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaChartBar className="text-blue-600 text-2xl" /> Your Submission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Score:</span>
                <span className="text-4xl font-bold text-green-600">
                  {userAttempt.score}/{userAttempt.totalScore}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Started At:</span>
                <span className="font-semibold">{started}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Finished At:</span>
                <span className="font-semibold">{finished}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              {certificateIssued && certificateId ? (
                <Link href={`/certificate/${certificateId}`}>
                  <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
                    <FaDownload className="text-lg" />
                    Download Certificate
                  </div>
                </Link>
               
              ) : (
                <div className="text-gray-600 italic">
                  No certificate issued.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaChartBar className="text-green-600 text-2xl" /> Score Comparison
          </h2>
          <div className="h-64">
            <canvas ref={comparisonChartRef}></canvas>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaTrophy className="text-yellow-500 text-2xl" /> Top 5 Performers
          </h2>
          <div className="divide-y divide-gray-200">
            {topAttempts.map((a:any) => (
            
              <div key={a.rank} className="flex justify-between py-3 items-center">
                <div className="text-gray-700">
                  Rank {a.rank} <span className="font-medium">{a.userName}</span>
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  {a.score}
                </div>
              </div>
            ))}
            <div  className="flex justify-between py-3 text-white items-center bg-blue-500 px-4 border rounded-4xl">
                <div className="">
                  Rank {userAttempt.userRank} <span className="font-medium">You</span>
                </div>
                <div className="text-lg font-semibold ">
                  {userAttempt.score}
                </div>
              </div>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaUsers className="text-green-600 text-2xl" /> Peer Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 p-4 rounded-xl">
              <FaPercentage className="text-blue-600 text-3xl mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {peerStats.averageScore}
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <FaTrophy className="text-green-600 text-3xl mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {peerStats.highestScore}
              </div>
              <div className="text-sm text-gray-600">Highest Score</div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <FaPercentage className="text-red-600 text-3xl mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {peerStats.lowestScore}
              </div>
              <div className="text-sm text-gray-600">Lowest Score</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
