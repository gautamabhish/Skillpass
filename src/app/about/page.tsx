'use client';

import NavbarLogged from '@/components/ui/globals/NavbarLogged';

const AboutAndSupportPage: React.FC = () => {
  return (
    <div>
      <NavbarLogged />
      <div
        className="relative flex min-h-screen flex-col bg-[#f8f9fc] overflow-x-hidden"
        style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
      >
        <div className="px-40 flex justify-center py-5">
          <div className="max-w-[960px] flex-1">
            {/* About Section */}
            <div className="p-4">
              <h1 className="text-[#0c111c] text-[32px] font-bold leading-tight">About Us</h1>
              <p className="text-[#4662a0] text-sm mt-2">
                Learn more about our mission, values, and what drives us to improve the quiz learning experience.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 my-4 border border-[#cdd6e9]">
              <h2 className="text-[#0c111c] text-xl font-semibold mb-2">Our Mission</h2>
              <p className="text-[#4662a0] text-sm">
                We aim to make learning accessible, engaging, and rewarding through a rich quiz-based platform that helps students learn, revise, and earn.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#cdd6e9] my-8" />

            {/* Support Section */}
            <div className="p-4">
              <h1 className="text-[#0c111c] text-[32px] font-bold leading-tight">Support</h1>
              <p className="text-[#4662a0] text-sm mt-2">
                Need help? We’ve answered the most common questions below. Still stuck? Reach out to us.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 my-4 border border-[#cdd6e9]">
              <h2 className="text-[#0c111c] text-xl font-semibold mb-4">FAQs</h2>
              <div className="space-y-4 text-[#4662a0] text-sm">
                <div>
                  <strong>Q: How do I reset my password?</strong>
                  <p>A: Click on “Forgot Password” on the login page and follow the instructions to reset it via email.</p>
                </div>
                <div>
                  <strong>Q: How can I withdraw referral earnings?</strong>
                  <p>A: Go to your Dashboard &gt; Referral section. If you've earned ₹100 or more, you can initiate a withdrawal to your registered payment method.</p>
                </div>
                <div>
                  <strong>Q: Where can I see my completed quizzes?</strong>
                  <p>A: Your completed quizzes and scores are available in your Dashboard under the “My Quizzes” section.</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 my-4 border border-[#cdd6e9]">
              <h2 className="text-[#0c111c] text-xl font-semibold mb-2">Contact Us</h2>
              <p className="text-[#4662a0] text-sm">
                Can’t find what you’re looking for? Email our support team at{' '}
                <a className="text-blue-600 hover:underline" href="mailto:support@yourapp.com">
                  support@yourapp.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAndSupportPage;
