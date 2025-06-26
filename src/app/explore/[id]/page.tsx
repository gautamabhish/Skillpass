//@ts-nocheck
'use client';
import { useFetchQuiz } from '@/hooks/usefetchQuiz';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';
import * as Chart from 'chart.js/auto';

import { useParams, useSearchParams } from 'next/navigation'; // Import from next/navigation for App Router
import Image from 'next/image';
import {
  FaUser,
  FaRegStar,
  FaHalfStar,
  FaClock,
  FaStar,
  FaUsers,
  FaShareAlt,
  FaPlay,
  FaHeart,
  FaCheck,
  FaGraduationCap,
  FaTrophy,
  FaCode,
  FaChartLine,
  FaQuestionCircle,
  FaCertificate,
  FaChartBar,
  FaGift,
  FaCheckCircle,
  FaTimesCircle,
  FaPercentage
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default  function dataDetailPage(){ 
  const router = useRouter();
    const routerParams = useParams();
  const { data, isLoading } = useFetchQuiz(routerParams.id as string);

  // Chart refs

  const questionTypesChartRef = useRef<HTMLCanvasElement>(null);
  const attemptsChartRef = useRef<HTMLCanvasElement>(null);
  // const ratingsChartRef = useRef<HTMLCanvasElement>(null);

  // Chart instances (to destroy on cleanup)
  const chartInstancesRef = useRef<Chart.Chart[]>([]);

  // Comment / review state:
  const [comment, setComment] = useState('');
  const [referralToken, setReferralToken] = useState('');

  // const [rating, setRating] = useState(5);
  const [rating, setRating] = useState(5); // Default rating
  const [comments, setComments] = useState<any[]>([]);

  // "Copied to clipboard" flag
  const [copied, setCopied] = useState(false);

  // Like (wishlist) state
  const [isLiked, setIsLiked] = useState(false);

  // Show preview modal
  const [showPreview, setShowPreview] = useState(false);

  // Razorpay script loaded?
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  const userId = useAppSelector((state) => state.user.id);
  const currentUserName = useAppSelector((state) => state.user);
  const currentUserEmail = useAppSelector((state) => state.user.email);
  const referralTokenFromUrl = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('ref')
    : null;

useEffect(() => {
  if (typeof window !== 'undefined' && (window as any).Razorpay) {
    setIsRazorpayReady(true);
    // alert("Hola")
  }
}, []);


  // Initialize charts when data data is available
  useEffect(() => {
    if (!data || !data.analytics) return;

    // Cleanup existing charts
    chartInstancesRef.current.forEach(chart => chart.destroy());
    chartInstancesRef.current = [];

    // Question Types Chart
    if (questionTypesChartRef.current) {
      const ctx = questionTypesChartRef.current.getContext('2d');
      if (ctx) {
        const questionTypes = data.analytics.questions.questionTypes;
        const chart = new Chart.Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(questionTypes),
            datasets: [{
              data: Object.values(questionTypes),
              backgroundColor: [
                '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'
              ],
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  usePointStyle: true
                }
              }
            }
          }
        });
        chartInstancesRef.current.push(chart);
      }
    }
 
    // Attempts Chart
   
    if (attemptsChartRef.current) {
      const ctx = attemptsChartRef.current.getContext('2d');
      if (ctx) {
        const attempts = data.analytics.attempts;
        const chart = new Chart.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Total Attempts', 'Completed', 'In Progress'],
            datasets: [{
              label: 'Attempts',
              data: [
                attempts.totalAttempts,
                attempts.completedAttempts,
                attempts.inProgressAttempts
              ],
              backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
        chartInstancesRef.current.push(chart);
      }
    }

    // Ratings Distribution Chart
    // if (ratingsChartRef.current && data.analytics.ratings.totalRatings > 0) {
    //   const ctx = ratingsChartRef.current.getContext('2d');
    //   if (ctx) {
    //     // Mock rating distribution for demo - in real app, you'd get this from backend
    //     const ratingDist = data.analytics.;
    //     const chart = new Chart.Chart(ctx, {
    //       type: 'bar',
    //       data: {
    //         labels: ['5★', '4★', '3★', '2★', '1★'],
    //         datasets: [{
    //           label: 'Ratings',
    //           data: Object.values(ratingDist),
    //           backgroundColor: '#10B981',
    //           borderRadius: 4
    //         }]
    //       },
    //       options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //           legend: {
    //             display: false
    //           }
    //         },
    //         scales: {
    //           y: {
    //             beginAtZero: true,
    //             ticks: {
    //               stepSize: 1
    //             }
    //           }
    //         }
    //       }
    //     });
    //     chartInstancesRef.current.push(chart);
    //   }
    // }
   setRating(()=>data.summary.averageRating || 5); // Set initial rating based on data, default to 5 if not available
   console.log("Rating set to:", data.summary.averageRating );
    return () => {
      chartInstancesRef.current.forEach(chart => chart.destroy());
    };
  }, [data]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      // In real app, submit to backend
      const newComment = {
        rating,
        comment,
        createdAt: new Date().toISOString(),
        user: { name: 'Demo User' }
      };
      setComments([newComment, ...comments]);
      setComment('');
     
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  const handleShare = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/data/${data?.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: data?.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  };

const handleEnroll = async () => {
  if (!data || !isRazorpayReady) {
    alert('Payment SDK not ready. Please try again shortly.');
    return;
  }

  try {
    // 1. Create Razorpay order from backend
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/create`, {
      userId,
      quizId: data.id,
      referralToken: referralTokenFromUrl || null,
    },{
      withCredentials: true, // Ensure cookies are sent for session
    });

    const { orderId, amount, currency, quizTitle, referralApplied } = response.data;

    // 2. Razorpay checkout options
    if(orderId ===process.env.NEXT_PUBLIC_FREE_QUIZ_ORDER_ID){
      alert('This quiz is free to access. You can start it now without payment.Check the quizzes owned by you.');
      // router.push(`/session/${data.id}`);
         return ;
    }
 
    const options = {
      key: process.env.NEXT_PUBLIC_KEYID, // Public Razorpay key
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      name: 'SKILLPASS',
      description: referralApplied
        ? 'You received a referral , you have to validate it  '
        : `Payment for ${quizTitle} is going to unlock the quiz.`,
      order_id: orderId,
      handler: async (response: any) => {
        try {
          // 3. Verify payment on backend
          await axios.post('/api/payments/verify', {
            userId,
            quizId: data.id,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            referralToken: referralTokenFromUrl || null,
          });

          alert('✅ Payment successful! Quiz unlocked.');
          // Optionally refresh or redirect
        } catch (verifyErr) {
          console.error('❌ Payment verification failed:', verifyErr);
          alert('Payment completed, but verification failed.');
        }
      },
      prefill: {
        name: currentUserName || 'Demo User',
        email: currentUserEmail || 'demo@example.com',
      },
      theme: {
        color: '#2563eb', // Tailwind blue-600
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    // console.log('Razorpay options:', options);
    razorpay.open();
  } catch (err) {
    console.error('Error during Razorpay payment flow:', err);
    alert('Failed to initiate payment. Please try again.');
  }
};


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">data not found</h1>
          <p className="text-gray-600">The data you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-900 to-[#2563eb]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-blue-200">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${getDifficultyColor(data.difficulty)}`}>
                  {data.difficulty}
                </span>
                {data.course && (
                  <>
                    <span>•</span>
                    <span className="text-sm">{data.course.name}</span>
                  </>
                )}
                <span>•</span>
                <span className="text-sm">{data.duration} minutes</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {data.title}
              </h1>

              <p className="text-xl leading-relaxed">
                {data.description}
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="font-medium">{data.creator.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaQuestionCircle className="text-yellow-400" />
                  <span>{data.summary.totalQuestions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-green-400" />
                  <span>{data.summary.totalAttempts} attempts</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span>{data.summary.avgRating}</span>
                  <span className="text-sm">({data.summary.totalRatings} reviews)</span>
                </div>
              </div>
              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600/30 rounded-full text-sm backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <Image
                  width = {800}
                  height = {400}
                  src={data.thumbnailURL}
                  alt={data.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-gray-900 hover:bg-white transition-colors"
                  >
                    <FaPlay className="text-blue-700" />
                    Preview data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* data Analytics */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-white text-sm" />
                </div>
                 Analytics
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaQuestionCircle className="text-blue-600 text-xl" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{data.summary.totalQuestions}</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-green-600 text-xl" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{data.summary.totalAttempts}</div>
                      <div className="text-sm text-gray-600">Total Attempts</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaPercentage className="text-yellow-600 text-xl" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{data.summary.averageScore}%</div>
                      <div className="text-sm text-gray-600">Avg Score</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaCertificate className="text-purple-600 text-xl" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{data.summary.certificatesIssued}</div>
                      <div className="text-sm text-gray-600">Certificates</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Question Types Chart */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Question Types</h3>
                  <div className="h-48">
                    <canvas ref={questionTypesChartRef}></canvas>
                  </div>
                </div>

                {/* Attempts Chart */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Attempt Status</h3>
                  <div className="h-48">
                    <canvas ref={attemptsChartRef}></canvas>
                  </div>
                </div>

                {/* Ratings Chart */}
                {/* {data.analytics.ratings.totalRatings > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                    <div className="h-48">
                      <canvas ref={ratingsChartRef}></canvas>
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            {/* data Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <FaGraduationCap className="text-white text-sm" />
                </div>
            Overview 
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Points:</span>
                    <span className="font-semibold">{data.summary.totalPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{data.duration} minutes</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(data.difficulty)}`}>
                      {data.difficulty}
                    </span>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Backtrack Allowed:</span>
                    <span className="font-semibold">{data.backtrack ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions Randomized:</span>
                    <span className="font-semibold">{data.randomize ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion Rate:</span>
                    <span className="font-semibold">{data.summary.completionRate}%</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Pass Rate:</span>
                    <span className="font-semibold">{data.summary.passRate}%</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-semibold">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews & Comments */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaStar className="text-yellow-500" />
                Student Reviews
              </h3>
        <div className="mb-4">
  {/* <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label> */}
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => {
      const starValue = index + 1;
      if (starValue <= Math.floor(rating)) {
        return <FaStar key={index} className="text-yellow-400 text-xl" />;
      } else if (
        starValue === Math.floor(rating) + 1 &&
        rating - Math.floor(rating) >= 0.25 &&
        rating - Math.floor(rating) < 0.75
      ) {
        return <FaStarHalfAlt key={index} className="text-yellow-400 text-xl" />;
      } else {
        return <FaRegStar key={index} className="text-gray-300 text-xl" />;
      }
    })}

    </div>
  
</div>
              <div className="space-y-4 mb-8">
                {comments.map((c, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-600"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{c.user?.name || 'Anonymous'}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar
                              key={idx}
                              className={`text-sm ${idx < c.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-700">{c.comment}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Share your thoughts</h4>

                {/* Rating selector */}
        


                <textarea
                  className="w-full border-2 border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                  placeholder="Write your review..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={handleCommentSubmit}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-6">
  <div className="text-center mb-6">
    <div className="flex items-center justify-center gap-3 mb-2">
      <span className="text-3xl font-bold text-gray-900">
        {data.currency === 'INR' ? '₹' : '$'}
        {data.price}
      </span>
      {data.price === 0 && (
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          FREE
        </span>
      )}
    </div>
  </div>

  <div className="space-y-4 mb-6">
    <button
      onClick={handleEnroll}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
    >
      {data.price === 0 ? 'Start Now' : 'Enroll Now'}
    </button>
  </div>

{/* Wrap both referral input and share button in a div with consistent bottom margin */}
<div className="space-y-4 mb-6">
  {data.price > 0 && (
    <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-3 rounded-xl shadow-sm">
      <FaGift className="text-blue-600 text-xl" />
      <div className="w-full">
        <input
          type="text"
          value={referralToken}
          onChange={(e) => setReferralToken(e.target.value)}
          placeholder="Enter referral token"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  )}

  
</div>


  <div className="flex gap-2 mb-6">
    <button
      onClick={handleShare}
      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all"
    >
      <FaShareAlt />
      Share
    </button>
  </div>

  {copied && (
    <div className="text-center py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium mb-4">
      Link copied to clipboard!
    </div>
  )}

  <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
    <div className="flex justify-between">
      <span>Questions:</span>
      <span className="font-medium">{data.summary.totalQuestions}</span>
    </div>
    <div className="flex justify-between">
      <span>Duration:</span>
      <span className="font-medium">{data.duration} minutes</span>
    </div>
    <div className="flex justify-between">
      <span>Difficulty:</span>
      <span className="font-medium">{data.difficulty}</span>
    </div>
    {/* Uncomment if you want to show Pass Rate
    <div className="flex justify-between">
      <span>Pass Rate:</span>
      <span className="font-medium text-green-600">{data.summary.passRate}%</span>
    </div>
    */}
  </div>
</div>


            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <FaChartBar className="text-white text-sm" />
                </div>
                Key Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <FaUsers className="text-blue-600 text-2xl" />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{data.summary.totalAttempts}</div>
                    <div className="text-sm text-gray-600">Total data Attempts</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <FaCheck className="text-green-600 text-2xl" />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{data.summary.completionRate}%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                  <FaTrophy className="text-yellow-600 text-2xl" />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{data.summary.averageScore}%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <FaCode className="text-purple-600 text-2xl" />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{data.summary.totalQuestions}</div>
                    <div className="text-sm text-gray-600">Number of Questions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-4"> {data.title}</h2>
            <p className="text-gray-700 mb-6">{data.description}</p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-gray-600">
                <span>Total Questions:</span>
                <span className="font-semibold">{data.summary.totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Duration:</span>
                <span className="font-semibold">{data.duration} minutes</span>
              </div>
              {/* <div className="flex justify-between items-center text-gray-600">
                <span>Difficulty:</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(data.difficulty)}`}>
                  {data.difficulty}
                </span>
              </div> */}
            </div>
            <p className="text-sm text-gray-500 italic">
              This is a preview. To take the full data, please enroll.
            </p>
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
