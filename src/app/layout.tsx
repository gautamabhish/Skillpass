
import type { Metadata } from "next";
import { Geist, Geist_Mono , Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/store";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
      >
     <QueryProvider>

      <ReduxProvider>
        {children}
      </ReduxProvider>
     </QueryProvider>
        
       
       <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      </body>
    </html>
  );
}
