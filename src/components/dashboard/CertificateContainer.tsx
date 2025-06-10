"use client";

import React from 'react';
import CertificateCard from '../ui/dashboard/CertficateCard';
import { useDashboard } from '@/hooks/useDashbaord';
import Link from 'next/link';
import { FileBadge, ArrowRight } from 'lucide-react';

function CertificatesContainer() {
  const { data, isLoading } = useDashboard();
  const certificates = data?.certificates || [];

  return (
    <section className="flex flex-col gap-4 mt-4 px-4 sm:px-6 md:px-20 py-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Your Certificates
      </h1>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 place-items-center px-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="shadow-md rounded-2xl p-6 animate-pulse flex flex-col gap-4 w-full max-w-sm"
            >
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 w-24 h-4 rounded"></div>
                <div className="bg-gray-200 w-20 h-4 rounded"></div>
              </div>
              <div className="bg-gray-300 w-full h-2 rounded"></div>
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 w-24 h-4 rounded"></div>
                <div className="bg-gray-200 w-16 h-4 rounded"></div>
              </div>
            </div>
          ))
        ) : certificates.length > 0 ? (
          certificates.map((cert: any, idx: number) => (
            <div key={idx} className="w-full max-w-sm">
              <CertificateCard
                image="/certificate-default.png"
                title={cert.userName}
                id={cert.id}
                completed={`Scored ${cert.score} - ${new Date(cert.issuedAt).toLocaleDateString()}`}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center mt-10 flex flex-col items-center gap-4">
            <FileBadge className="w-12 h-12 text-gray-400" />
            <p className="text-gray-600 text-lg font-medium">
              You don't have any certificates yet.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Explore Quizzes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default CertificatesContainer;
