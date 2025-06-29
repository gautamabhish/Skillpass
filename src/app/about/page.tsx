'use client';

import Navbar from '@/components/ui/globals/ExploreNavbar';
// import NavbarLogged from '@/components/ui/globals/NavbarLogged';
import Link from 'next/link';

const AboutAndSupportPage: React.FC = () => {
  return (
    <div className="bg-[#f8f9fc] min-h-screen flex flex-col">
      <Navbar />

      <main
        className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8"
        style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
      >
        {/* ABOUT */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0c111c]">About SkillPass</h1>
            <p className="text-sm text-[#4662a0] max-w-2xl mx-auto mt-2">
              At SkillPass, we’re committed to making learning interactive, accessible, and rewarding.
              Our quiz platform enables students to test their knowledge, improve their skills, and earn real rewards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#cdd6e9] p-6">
              <h3 className="text-[#0c111c] text-lg font-semibold mb-2">Our Mission</h3>
              <p className="text-[#4662a0] text-sm">
                To democratize education through engaging, quiz-based learning and to incentivize knowledge with real rewards.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#cdd6e9] p-6">
              <h3 className="text-[#0c111c] text-lg font-semibold mb-2">Our Vision</h3>
              <p className="text-[#4662a0] text-sm">
                A global learning community where everyone can grow skills, track progress, and earn from achievements.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#cdd6e9] p-6">
              <h3 className="text-[#0c111c] text-lg font-semibold mb-2">Our Values</h3>
              <p className="text-[#4662a0] text-sm">
                Excellence, inclusivity, transparency, and innovation in digital education.
              </p>
            </div>
            
          </div>
        </section>

        {/* SUPPORT */}
        <section>
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0c111c]">Support</h1>
            <p className="text-sm text-[#4662a0] max-w-2xl mx-auto mt-2">
              We’re here to help. Find answers below or contact us for assistance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#cdd6e9] p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#0c111c] mb-4">Platform FAQs</h2>
            <div className="space-y-4 text-sm text-[#4662a0]">
              <div>
                <strong className="block text-[#0c111c]">How can I withdraw referral earnings?</strong>
                <p>Go to Dashboard → Referral section. Once you’ve filled the form , you can request withdrawal to your registered payment method.</p>
              </div>

               <div>
    <strong className="block text-[#0c111c]">When is a referral link generated?</strong>
    <p>
      A referral link is generated only when you share a quiz directly from its explore page. Simply click the “Recommend” button on the quiz detail page to get your unique referral link.
    </p>
  </div>

              <div>
                <strong className="block text-[#0c111c]">Where can I view my completed quizzes?</strong>
                <p>Visit Dashboard → My Quizzes to see all your completed quizzes, scores, and certificates.</p>
              </div>
              <div>
                <strong className="block text-[#0c111c]">How does the referral system work?</strong>
                <p>Invite friends using your referral link. When they sign up and complete a quiz, you earn rewards automatically.</p>
              </div>
              <div>
                <strong className="block text-[#0c111c]">Can I retake a quiz?</strong>
                <p>Yes! Quizzes can usually be retaken after a cooldown period. Check the quiz details page for specific retake rules.</p>
              </div>
              <div>
                <strong className="block text-[#0c111c]">How do I report an issue?</strong>
                <p>Click “Report Issue” inside any quiz or email us at <a href="mailto:support@skillpass.org" className="text-blue-600 hover:underline">support@skillpass.org</a>.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#cdd6e9] p-6 text-center">
            <h2 className="text-xl font-semibold text-[#0c111c] mb-2">Contact Us</h2>
            <p className="text-sm text-[#4662a0] mb-4">
              Can’t find your answer? We’d love to help.
            </p>
            <a 
              href="mailto:support@skillpass.org" 
              className="inline-block rounded-full bg-[#155efc] text-white font-semibold text-sm px-5 py-2 hover:bg-[#0d47a1] transition"
            >
              Email Support
            </a>
          </div>
        </section>

        {/* Call to Action */}
        <div className="flex justify-center mt-8">
          <Link href="/explore">
            <button className="rounded-full h-10 px-4 bg-[#155efc] text-white text-sm font-bold hover:bg-[#0d47a1] transition">
              Explore Quizzes
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AboutAndSupportPage;
