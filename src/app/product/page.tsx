//@ts-nocheck
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
const inter = Inter({ subsets: ['latin'] });
export default function ProductPage() {
//   const scrollToHash = () => {
//     if (typeof window !== 'undefined') {
//       const hash = window.location.hash;
//       if (hash) {
//         const target = document.querySelector(hash);
//         if (target) {
//           target.scrollIntoView({ behavior: 'smooth' });
//         }
//       }
//     }
//   };
//   const router = useRouter();

//   useEffect(() => {
//     scrollToHash();
//   }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-20 scroll-smooth">
      <nav className={clsx('bg-gray-100 p-4 rounded-lg shadow-sm', inter.className)}>
        <ul className="flex flex-col md:flex-row gap-6 justify-center text-lg font-medium text-blue-700 scroll-smooth">
          <li>
            <a href="#overview" className="hover:text-blue-900 transition-colors duration-200">Overview</a>
          </li>
          <li>
            <a href="#features" className="hover:text-blue-900 transition-colors duration-200">Features</a>
          </li>
          <li>
            <a href="#security" className="hover:text-blue-900 transition-colors duration-200">Security</a>
          </li>
          <li>
            <a href="#how-it-works" className="hover:text-blue-900 transition-colors duration-200">How It Works</a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-blue-900 transition-colors duration-200">Pricing</a>
          </li>
        </ul>
      </nav>
      <section id="overview">
        <h2 className="text-3xl font-bold text-[#3277ee] mb-4">Overview</h2>
        <p className="text-gray-700 text-lg">
          Skillpass.org is your gateway to mastering technical and career-ready skills with curated quizzes,
          expert certifications, and gamified learning. Our platform ensures fair assessment with secure 
          sessions and advanced anti-cheat protection.
        </p>
      </section>

      <section id="features">
        <h2 className="text-3xl font-bold text-[#3277ee] mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Learning & Assessment</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Curated technical quizzes for real-world skill validation</li>
              <li>Instant certificates with score-based verification</li>
              <li>Multiple question formats and difficulty levels</li>
              <li>Detailed performance analytics</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Gamification & Progress</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Referral rewards and gamified dashboard</li>
              <li>Track progress, leaderboard ranking, and badges</li>
              <li>Achievement streaks and milestone rewards</li>
              <li>Community features and peer comparison</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="security" className="bg-red-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-6">🛡️ Anti-Cheat Protection</h2>
        <p className="text-gray-700 mb-6">
          Our platform maintains assessment integrity through multiple security layers that detect and prevent cheating attempts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Secure Sessions</h3>
            <p className="text-sm text-gray-600">
              Protected quiz sessions with encrypted data transmission and secure user authentication 
              to prevent unauthorized access and session hijacking.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl mb-3">🚫</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Anti-Cheat Techniques</h3>
            <p className="text-sm text-gray-600">
              Advanced monitoring systems that detect suspicious behavior patterns, unusual answer 
              speeds, and other indicators of potential cheating attempts.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Auto-Submit on Cheating</h3>
            <p className="text-sm text-gray-600">
              Automatic quiz submission when cheating behavior is detected, ensuring fair play 
              and maintaining the integrity of the assessment process.
            </p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Fair Play Policy:</strong> Our anti-cheat system helps maintain a level playing field 
            for all users while ensuring authentic skill validation.
          </p>
        </div>
      </section>

      <section id="how-it-works">
        <h2 className="text-3xl font-bold text-[#3277ee] mb-6">How Our Security Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#3277ee] text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <h4 className="font-semibold text-gray-800">Session Initialization</h4>
                <p className="text-gray-600 text-sm">Secure session created with unique tokens and user verification</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#3277ee] text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <h4 className="font-semibold text-gray-800">Continuous Monitoring</h4>
                <p className="text-gray-600 text-sm">Real-time behavior analysis throughout the quiz session</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#3277ee] text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <h4 className="font-semibold text-gray-800">Threat Detection</h4>
                <p className="text-gray-600 text-sm">Automated detection of suspicious patterns and anomalies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#3277ee] text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <h4 className="font-semibold text-gray-800">Instant Response</h4>
                <p className="text-gray-600 text-sm">Immediate action taken when cheating is detected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <h2 className="text-3xl font-bold text-[#3277ee] mb-4">Pricing</h2>
        <p className="text-gray-700 text-lg mb-6">
          Skillpass.org is completely <span className="text-green-600 font-semibold">free for learners</span>. 
          Revenue is generated through our creator partnership program.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-2 border-green-500 rounded-lg p-8 shadow-lg text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-semibold mb-4">For Learners</h3>
            <p className="text-green-600 font-bold text-4xl mb-4">FREE</p>
            <p className="text-gray-600 mb-6">Complete access to all platform features</p>
            <ul className="text-left text-gray-700 space-y-2 mb-6">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>All free quizzes and certifications</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Secure anti-cheat protection</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Gamified learning experience</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Progress tracking and analytics</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Referral rewards program</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Community features</li>
            </ul>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition" onClick={() => router.push('/register') }>
              Start Learning Free
            </button>
          </div>

          <div className="border-2 border-[#3277ee] rounded-lg p-8 shadow-lg text-center">
            <div className="text-4xl mb-4">👨‍💼</div>
            <h3 className="text-2xl font-semibold mb-4">For Creators</h3>
            <p className="text-[#3277ee] font-bold text-4xl mb-4">Revenue Share</p>
            <p className="text-gray-600 mb-6">Earn from your quiz content and expertise</p>
            <ul className="text-left text-gray-700 space-y-2 mb-6">
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>Create and publish quizzes</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>Earn from quiz completions</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>Analytics and performance insights</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>Content management tools</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>Direct learner engagement</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>Promotional opportunities</li>
            </ul>
            <button className="w-full bg-[#3277ee] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition" onClick={() => router.push('/register')}>
              Become a Creator
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">How We Generate Revenue</h3>
          <p className="text-blue-700">
            Our platform features remains free for learners through partnerships with educational content creators, 
            corporate training programs, and premium certification partnerships. Creators earn revenue 
            based on quiz engagement.
          </p>
        </div>
      </section>

      <section id="trust-stats" className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3277ee]">100%</div>
            <div className="text-sm text-gray-600">Free for Learners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3277ee]">24/7</div>
            <div className="text-sm text-gray-600">Security Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3277ee]">Real-time</div>
            <div className="text-sm text-gray-600">Cheat Detection</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3277ee]">Instant</div>
            <div className="text-sm text-gray-600">Auto-Submit</div>
          </div>
        </div>
      </section>
    </div>
  );
}