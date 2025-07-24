//@ts-nocheck
'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController
} from 'chart.js/auto';
import { 
  Trophy, TrendingUp, Clock, Target, Brain, AlertTriangle,
  Calendar, BarChart3, PieChart, Activity,
  CheckCircle, XCircle, Users, Zap
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';
import Link from 'next/link';
import ExploreLoading from '@/app/loading';
import { notFound } from 'next/navigation';
import HamburgerMenu from '@/components/ui/globals/Hamburger';
import { useParams } from 'next/navigation';
import { useDeepAnalysis } from '@/hooks/useDeepAnalysis';
const QuizAnalysisDashboard = () => {
  const { id: quizId } = useParams();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | '7d' | '30d'>('all');
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef  = useRef<HTMLCanvasElement | null>(null);
  const barChartRef  = useRef<HTMLCanvasElement | null>(null);
  const lineChartInstance = useRef<ChartJS | null>(null);
  const pieChartInstance  = useRef<ChartJS | null>(null);
  const barChartInstance  = useRef<ChartJS | null>(null);
  const [limit ,setLimit] = useState<number>(10); // Limit for question breakdown display
  const { data: quizData, isLoading, error } = useDeepAnalysis(quizId);

  // Derive everything with useMemo, safely guarding quizData
  const analytics = useMemo(() => {
    if (!quizData) return null;
    if(quizData.latestAttemptDetails?.questionBreakdown.length<10) setLimit(quizData.latestAttemptDetails.questionBreakdown.length);
    const attempts = quizData.attempts.filter(a => a.score != null);
    const breakdown = quizData.latestAttemptDetails?.questionBreakdown ?? [];
    const totalQ = breakdown.length;
    const correct = breakdown.filter(q => q.isCorrect).length;
    const accuracy = totalQ ? (correct/totalQ)*100 : 0;
    const totalScore = quizData.latestAttemptDetails?.totalScore ?? 0;
    const times = attempts.map(a => {
      const s = new Date(a.startedAt), e = new Date(a.finishedAt);
      return (e.getTime() - s.getTime())/1000;
    });
    const avgTime = times.length ? times.reduce((x,y)=>x+y,0)/times.length : 0;

    return {
      totalAttempts: quizData.attempts.length,
      bestScore: attempts.length ? Math.max(...attempts.map(a=>a.score)) : 0,
      averageScore: attempts.length 
        ? attempts.reduce((sum,a)=>sum+a.score,0)/attempts.length 
        : 0,
      accuracy,
      totalQuestions: totalQ,
      correctAnswers: correct,
      totalScore,
      averageTime: avgTime,
      improvementRate: attempts.length > 1 && attempts[0].score && attempts.at(-1)!.score
        ? ((attempts.at(-1)!.score - attempts[0].score) / attempts[0].score) * 100
        : 0,
    };
  }, [quizData]);

  const attemptProgressData = useMemo(() => {
    if (!quizData) return [];
    return (
      quizData.attempts
        .filter(a=>a.score!=null)
        .map((a,i)=>({
          attempt: i+1,
          score: a.score,
          date: new Date(a.startedAt).toLocaleDateString(),
          duration: Math.round((new Date(a.finishedAt) - new Date(a.startedAt))/1000)
        }))
        .reverse()
    );
  }, [quizData]);

  const performanceData = useMemo(() => {
    if (!analytics) return [];
    return [
      { name: 'Correct',   value: analytics.correctAnswers,   color: '#10b981' },
      { name: 'Incorrect', value: analytics.totalQuestions - analytics.correctAnswers, color: '#ef4444' },
    ];
  }, [analytics]);

  // ----------- Chart Effects -----------
  useEffect(() => {
    if (!lineChartRef.current || !pieChartRef.current ) return;

    // Line Chart
    if (lineChartInstance.current) lineChartInstance.current.destroy();
    lineChartInstance.current = new ChartJS(lineChartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels: attemptProgressData.map(d => `Attempt ${d.attempt}`),
        datasets: [{
          label: 'Score',
          data: attemptProgressData.map(d => d.score),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.1)',
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });

    // Pie Chart
    if (pieChartInstance.current) pieChartInstance.current.destroy();
    pieChartInstance.current = new ChartJS(pieChartRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: performanceData.map(d => d.name),
        datasets: [{
          data: performanceData.map(d => d.value),
          backgroundColor: performanceData.map(d => d.color),
          cutout: '60%',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });

    // Bar Chart
 

    return () => {
      lineChartInstance.current?.destroy();
      pieChartInstance.current?.destroy();
      barChartInstance.current?.destroy();
    };
  }, [attemptProgressData, performanceData]); 
  // ─── 2) Early returns *after* hooks ───────────────────────
  if (isLoading) return <ExploreLoading />;
  if (error?.response?.status === 404 || !quizData) return notFound();

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue", trend = null }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-5 h-5 text-${color}-600`} />
            <span className="text-sm font-medium text-gray-600">{title}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
     <div className="bg-white border-b border-gray-200">
  <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-6 py-1">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-3">
        <Link href="/explore" className="flex items-center">
          <Image
            src="/logonew.png"
            alt="logo"
            width={90}
            height={90}
            className="object-contain"
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <span>Deep Analytics</span>
        </h1>
      </div>

      {/* Right: Filter + Menu */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
        >
          <option value="all">All Time</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select> */}

        <div className="sm:ml-2">
          <HamburgerMenu />
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <StatCard
  icon={Trophy}
  title="Best Score"
  value={`${analytics.bestScore}/${analytics.totalScore}`}
  subtitle={`${Math.round(analytics.accuracy)}% Accuracy`}
  color="yellow"
/>

          <StatCard
            icon={Target}
            title="Average Score"
            value={analytics.averageScore.toFixed(1)}
            subtitle="Across all attempts"
            color="blue"
          />
          <StatCard
            icon={Clock}
            title="Avg. Duration"
            value={`${Math.round(analytics.averageTime/60)} mins`}
            subtitle="Per attempt"
            color="green"
          />
          <StatCard
            icon={Activity}
            title="Total Attempts"
            value={analytics.totalAttempts-1}
            subtitle={`${analytics.totalAttempts - 2} retakes`}
            color="purple"
            trend={analytics.improvementRate}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Over Time */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Progress Over Time</h3>
            </div>
            <div className="h-80">
              <canvas ref={lineChartRef}></canvas>
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Latest Attempt Performance</h3>
            </div>
            <div className="h-80">
              <canvas ref={pieChartRef}></canvas>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Correct ({analytics.correctAnswers})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Incorrect ({analytics.totalQuestions - analytics.correctAnswers})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Analysis */}
        {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Topic-wise Performance</h3>
          </div>
          <div className="h-80">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div> */}

        {/* Detailed Question Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Question Analysis - Latest Attempt</h3>
          </div>
          
          <div className="space-y-4">
            {quizData.latestAttemptDetails.questionBreakdown.slice(0, limit).map((question, index) => (
              <div key={question.questionId} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
                      {/* {question.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )} */}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        question.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {question.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-3">{question.title}</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, idx) => {
                        const isSelected = question.selectedAnswer.includes(idx);
                        const isCorrect = question.correctAnswer.includes(idx);
                        return (
                          <div key={idx} className={`px-3 py-2 rounded-md text-sm border ${
                            isCorrect ? 'bg-green-50 border-green-200 text-green-800' :
                            isSelected ? 'bg-red-50 border-red-200 text-red-800' :
                            'bg-gray-50 border-gray-200 text-gray-600'
                          }`}>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{String.fromCharCode(65 + idx)}.</span>
                              <span>{option}</span>
                              {isCorrect && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                              {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 ml-auto" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {limit < quizData.latestAttemptDetails.questionBreakdown.length  && (
            <div className="text-center mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setLimit(quizData.latestAttemptDetails.questionBreakdown.length )}>
                View All ({quizData.latestAttemptDetails.questionBreakdown.length})
              </button>
            </div>
          )}
        </div>

        {/* Time Analysis */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(analytics.accuracy)}%</div>
              <div className="text-sm text-gray-600">Overall Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analytics.correctAnswers}</div>
              <div className="text-sm text-gray-600">Questions Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{Math.round(analytics.averageTime / 60)}m</div>
              <div className="text-sm text-gray-600">Avg. Time per Attempt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysisDashboard;