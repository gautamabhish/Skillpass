'use client';

import { Inter } from 'next/font/google';
import clsx from 'clsx';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function LegalPage() {
  return (
    <div className={clsx("max-w-4xl mx-auto px-4 py-12 space-y-16 text-gray-800", inter.className)}>
      <h1 className="text-4xl font-bold text-[#3277ee] text-center mb-10">Legal & Help</h1>

      {/* Terms of Service */}
      <section id="terms">
        <h2 className="text-2xl font-semibold mb-6">📜 Terms of Service</h2>
        
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Acceptance of Terms</h3>
            <p>By accessing and using Skillpass.org, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">User Conduct</h3>
            <p>Users must maintain fair usage practices, including no cheating, no sharing of quiz content, and respectful behavior toward other users. Any attempt to circumvent our anti-cheat systems will result in immediate account suspension.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Creator Revenue Share</h3>
            <p>Content creators receive 60% of revenue generated from their quizzes and content. Skillpass.org retains 40% to cover platform maintenance, security infrastructure, and operational costs. Payments are processed monthly for earnings above ₹500.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Content Ownership & Liability</h3>
            <p>Creators retain ownership of their original content but grant Skillpass.org a non-exclusive license to use, distribute, and modify content for platform purposes. Creators are solely responsible for ensuring their content does not infringe on third-party rights or violate applicable laws.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Platform Liability</h3>
            <p>Skillpass.org provides the platform "as is" without warranties. We are not liable for any direct, indirect, incidental, or consequential damages arising from platform use. Our maximum liability is limited to the amount paid by the user in the preceding 12 months.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Termination</h3>
            <p>We reserve the right to suspend or terminate accounts that violate our guidelines, engage in fraudulent activities, or pose security risks. Users may delete their accounts at any time, but completed assessments and certificates remain valid.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Governing Law</h3>
            <p>These terms are governed by the laws of India. Any disputes shall be resolved through binding arbitration in Bengaluru, Karnataka, India.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">Last updated: June 2025. We reserve the right to modify these terms at any time with prior notice to users.</p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy">
        <h2 className="text-2xl font-semibold mb-6">🔒 Privacy Policy</h2>
        
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Information We Collect</h3>
            <p>We collect information you provide directly (name, email, profile data), usage data (quiz performance, time spent), and technical data (IP address, device information, browser type) necessary for platform functionality and security.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How We Use Your Information</h3>
            <p>Your data is used to provide services, prevent fraud, improve platform security, generate analytics, and communicate important updates. We may use aggregated, anonymized data for research and platform improvement.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Sharing</h3>
            <p>We do not sell personal data to third parties. We may share information with service providers (hosting, analytics), law enforcement when legally required, or during business transfers. Creator earnings data is shared only for payment processing.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Security</h3>
            <p>We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no system is 100% secure, and you use the platform at your own risk.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Retention</h3>
            <p>We retain user data for as long as accounts are active or as needed to provide services. Quiz results and certificates are retained indefinitely for verification purposes. Inactive accounts may be deleted after 3 years.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h3>
            <p>You may access, update, or delete your personal information through your account settings. For data deletion requests, contact us directly. Note that some information may be retained for legal or security purposes.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cookies and Tracking</h3>
            <p>We use cookies and similar technologies for authentication, preferences, analytics, and security. By using our platform, you consent to our use of cookies as described in this policy.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">We are committed to protecting your privacy while maintaining platform security and functionality. Last updated: June 2025.</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2 className="text-2xl font-semibold mb-6">📬 Contact Us</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            For any business inquiries, legal questions, creator partnerships, or technical assistance, reach out to us:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-semibold text-gray-800">General Inquiries</p>
                <a href="mailto:skillpass@skillpass.org" className="text-[#3277ee] hover:underline">skillpass@skillpass.org</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏢</span>
              <div>
                <p className="font-semibold text-gray-800">Office Location</p>
                <p className="text-gray-700">Bengaluru, Karnataka, India</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="font-semibold text-gray-800">Response Time</p>
                <p className="text-gray-700">We typically respond within 24-48 hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">🎓 For Learners</h3>
            <p className="text-sm text-gray-600">Questions about quizzes, certificates, or account issues</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">👨‍💼 For Creators</h3>
            <p className="text-sm text-gray-600">Partnership inquiries, revenue questions, or content guidelines</p>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section id="disclaimer" className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">⚖️ Legal Disclaimer</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> The information provided on Skillpass.org is for educational purposes only. 
            Certificates and assessments are not accredited by government bodies unless explicitly stated. 
            Users are responsible for verifying the acceptance of our certificates with their intended recipients. 
            Skillpass.org disclaims all liability for decisions made based on platform content or results.
          </p>
        </div>
      </section>
    </div>
  );
}