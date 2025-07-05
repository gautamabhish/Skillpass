'use client';
import React from 'react';
import { Cedarville_Cursive } from 'next/font/google';
import clsx from 'clsx';
import { useCertificateFetch } from '@/hooks/useCerificateFetch';
import ExploreLoading from '@/app/loading';

const Cedarvile = Cedarville_Cursive({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cedarville',
});

type CertificateProps = {
  certificateId: string;
};

const Certificate = ({ certificateId }: CertificateProps) => {
  const { data, isLoading } = useCertificateFetch(certificateId);

  const generateQRCode = () => {
    const qrData = encodeURIComponent(`https://skillpass.org/certificate/${certificateId}`);
    return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}`;
  };
    const certificateData = data?.certificateDetails;
  if (isLoading || !certificateData) {
    return <ExploreLoading/>;
  }

  const issueDate = new Date(certificateData.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div
        id="print-area"
        className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 border-4  border-[#d4a574] rounded-lg shadow-2xl"
      >
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-yellow-500"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-yellow-500"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-yellow-500"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-yellow-500"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 tracking-wider">
            CERTIFICATE
          </h1>
          <h2 className="text-2xl text-blue-700 font-semibold">OF ACHIEVEMENT</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main content */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-6">This is to certify that</p>
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 border-b-2 border-blue-300 pb-2 inline-block">
            {certificateData.userName}
          </h3>
          <p className="text-lg text-gray-700 mb-4">has successfully completed</p>
          <h4 className="text-xl md:text-2xl font-semibold text-blue-800 mb-6">
            {certificateData.quizTitle}
          </h4>

          {/* Score and Rank */}
          <div className="flex justify-center space-x-12 mb-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full px-6 py-3 mb-2">
                <span className="text-2xl font-bold text-green-800">
                  {certificateData.score}/{certificateData.totalScore}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium">SCORE</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full px-6 py-3 mb-2">
                <span className="text-2xl font-bold text-purple-800">#{certificateData.rank}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">RANK</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-12">
          {/* Left - Info */}
          <div className="text-left">
            {/* <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Certificate ID:</p>
              <p className="font-mono text-sm font-bold text-blue-800">{certificateData.id}</p>
            </div> */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Date Issued:</p>
              <p className="text-sm font-semibold text-gray-800">{issueDate}</p>
            </div>
          </div>

          {/* Center - QR Code */}
          <div className="text-center">
            <img
              src={generateQRCode()}
              alt="Certificate QR Code"
              className="mx-auto mb-2 border-2 border-gray-300 rounded"
            />
            <p className="text-xs text-gray-500">Scan to verify</p>
          </div>

          {/* Right - Signature */}
          <div className="text-right">
            <div className="w-48">
              <p className={clsx("text-xl font-[cursive] text-gray-800 leading-tight", Cedarvile.className)}>
                SkillPass
              </p>
              <div className="border-t-2 border-gray-400 pt-1">
                <p className="text-xs text-gray-500">Authorized Signature</p>
              </div>
              <p className="text-xs text-gray-600 mt-1 italic">
                Quiz Created by: {certificateData.creatorName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print button */}
      <div className="text-center mt-6">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200"
        >
          Print Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
