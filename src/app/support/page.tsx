'use client';

import React from 'react';
import { HelpCircle, BookOpen, Users, Award, DollarSign, MessageSquare, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/ui/globals/ExploreNavbar';

const EnhancedSupportPage: React.FC = () => {
const faqs = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    question: "How to create a Quiz?",
    answer: "Register and login to your account. Navigate to the 'Create Quiz' section from your dashboard. Add questions (single or multiple correct answers), attach files if needed, and use relevant tags so your quiz is easily discoverable.",
    category: "quiz-creation"
  },
  {
    icon: <Users className="w-5 h-5" />,
    question: "How to take a Quiz?",
    answer: "For free quizzes, click 'Enroll Now' on the quiz page. You'll receive a confirmation alert. Go to your dashboard and click 'Start' to begin.",
    category: "quiz-taking"
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    question: "How can I withdraw referral earnings?",
    answer: "Go to Share and Earn section. Fill the withdrawal form. You'll get a confirmation email, and money is sent within 72 hours.",
    category: "earnings"
  },
  {
    icon: <Users className="w-5 h-5" />,
    question: "How does the referral system work?",
    answer: "Invite friends using your referral link. The referral link is copied by clicking on Recommended Button in explore section. When they sign up and purchase a quiz using your referral, you earn rewards automatically.",
    category: "referral"
  },
  {
    icon: <Award className="w-5 h-5" />,
    question: "Where can I view my completed quizzes?",
    answer: "Visit Dashboard → The certificate section to see all quizzes you've completed. Certificates are available for download.",
    category: "dashboard"
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    question: "Can I retake a quiz?",
    answer: "Yes, most quizzes can be retaken after a cooldown. Check quiz details for specific rules.",
    category: "quiz-taking"
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    question: "What if I can't access anything on the platform?",
    answer: "If you face access issues, try logging out and logging back in. If the problem persists, please contact us at support@skillpass.org.",
    category: "general"
  }
];


  const categories = [
    { id: 'quiz-creation', name: 'Quiz Creation', icon: <BookOpen className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
    { id: 'quiz-taking', name: 'Taking Quizzes', icon: <Users className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
    { id: 'earnings', name: 'Earnings', icon: <DollarSign className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    { id: 'referral', name: 'Referrals', icon: <Users className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
    { id: 'dashboard', name: 'Dashboard', icon: <Award className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600' }
  ];

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f8f9fc] to-[#e8f0fe] min-h-screen">
      {/* Header */}
    
      <div className="bg-slate-200 shadow-sm border-b border-[#cdd6e9]">
         <div className='p-2'>
       <Navbar></Navbar>
     </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-[#155efc] to-[#4285f4] p-3 rounded-full">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0c111c] mb-4">Support Center</h1>
          <p className="text-lg text-[#4662a0] max-w-2xl mx-auto">Everything you need to know about creating, taking, and managing quizzes on SkillPass.</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/create-quiz" className="block bg-white rounded-2xl shadow-lg border border-[#cdd6e9] p-6 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-[#0c111c] mb-2">Create Your First Quiz</h3>
            <p className="text-[#4662a0] text-sm mb-4">Start building engaging quizzes with our easy-to-use tools.</p>
            <span className="text-[#155efc] font-medium text-sm hover:text-[#0d47a1] flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></span>
          </Link>

          <Link href="/explore" className="block bg-white rounded-2xl shadow-lg border border-[#cdd6e9] p-6 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-[#0c111c] mb-2">Take a Quiz</h3>
            <p className="text-[#4662a0] text-sm mb-4">Explore quizzes and test your knowledge.</p>
            <span className="text-[#155efc] font-medium text-sm hover:text-[#0d47a1] flex items-center gap-2">Explore Quizzes <ArrowRight className="w-4 h-4" /></span>
          </Link>

          <Link href="/share-and-earn" className="block bg-white rounded-2xl shadow-lg border border-[#cdd6e9] p-6 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-[#0c111c] mb-2">Earn Money</h3>
            <p className="text-[#4662a0] text-sm mb-4">Refer friends and earn for every quiz completion.</p>
            <span className="text-[#155efc] font-medium text-sm hover:text-[#0d47a1] flex items-center gap-2">Start Earning <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

        {/* FAQ Categories */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#0c111c] mb-6">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`${category.color} px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium cursor-pointer hover:shadow-md transition-shadow`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#cdd6e9] p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#0c111c] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} id={faq.category} className="border-b border-[#e5e7eb] last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#155efc] to-[#4285f4] p-2 rounded-lg flex-shrink-0">
                    {React.cloneElement(faq.icon, { className: "w-5 h-5 text-white" })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0c111c] mb-3">{faq.question}</h3>
                    <p className="text-[#4662a0] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#155efc] to-[#4285f4] rounded-2xl shadow-lg p-8 text-center text-white">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">Our team is ready to assist. Reach out anytime!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@skillpass.org" className="inline-flex items-center justify-center gap-2 bg-white text-[#155efc] font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition">
              <MessageSquare className="w-5 h-5" /> Email Support
            </a>
            <Link href="/explore" className="inline-flex items-center justify-center gap-2 border-2 border-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[#155efc] transition">
              <ArrowRight className="w-5 h-5" /> Explore Quizzes
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedSupportPage;
