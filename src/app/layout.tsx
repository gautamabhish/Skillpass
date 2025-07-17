
import type { Metadata } from "next";
import { Geist, Geist_Mono , Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/store";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReduxProvider } from "@/Providers/ReduxProvider";
import { QueryProvider } from "@/Providers/QueryProvider";
// import { AuthProvider } from "@/Providers/AuthProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Skillpass.org - Learn, Certify, and Advance Your Career',
  icons: {
    icon:"/logonew.png"
  },
  description: 'Skillpass.org offers high-quality online quizzes, certifications, and learning resources to help you master new skills and boost your career.',
  keywords: [
    'Skillpass',
    'Skill Pass',
    'skillspass.org.mt',
    'Skills Pass Malta',
    'Courses',
    'Register',
    'Login',
    'Quizzes',
    'Certifications',
    'Skill Development',
    'Online Learning',
    'Career Advancement',
    'Skill Assessment',
    'skillpass.com',
    'online learning',
    'certification',
    'free quizzes',
    'career development',
    'skill development',
    'online courses'
  ],
  openGraph: {
    title: 'Skillpass.org - Learn, Certify, and Advance Your Career',
    description: 'Join Skillpass.org to access top quizzes, earn certifications, and grow your skills.',
    url: 'https://www.skillpass.org',
    siteName: 'Skillpass.org',
    images: [
      {
        url: 'https://www.skillpass.org/logonew.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Skillpass.org - Unlock Your Potential',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  metadataBase: new URL('https://www.skillpass.org'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><link rel="icon" href="/logonew.ico" sizes="any" />

     <QueryProvider>

      <ReduxProvider>
        {children}
      </ReduxProvider>
     </QueryProvider>
        
       
       <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <SpeedInsights />
      </body>
    </html>
  );
}
