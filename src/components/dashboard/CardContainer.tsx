"use client";
import React from 'react';
import { FaStar, FaRupeeSign } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { AiFillFire } from "react-icons/ai";
import Card from '@/components/ui/dashboard/GenCard';
import { useDashboard } from '@/hooks/useDashbaord';

function CardContainer() {
  const { data, isLoading } = useDashboard();
  console.log("Dashboard Data:", data);
  const cardData = data ? [
    {
      title: "Total Points",
      number: data.stats.totalPoints.toString(),
      subtext: `+${data.stats.pointsThisWeek} this week`,
      icon: FaStar,
      color: "yellow",
    },
    {
      title: "Total Earnings",
      number: data.stats.totalEarnings.toString(),
      subtext: "in INR",
      icon: FaRupeeSign,
      color: "blue",
    },
    {
      title: "Learning Streak",
      number: `${data.stats.streak} Days`,
      subtext: "Keep growing!",
      icon: AiFillFire,
      color: "orange",
    },
    {
      title: "Certificates",
      number: data.certificates.length.toString(),
      subtext: "Earned so far",
      icon: LiaCertificateSolid,
      color: "green",
    },
  ] : [];

  return (
    <section className="flex flex-col md:flex-row flex-wrap w-full items-center justify-around gap-4 mt-4 px-6 py-2 md:px-16 md:py-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-4 w-fit min-w-[300px] animate-pulse flex flex-col gap-2 m-2">
            <div className="flex justify-between items-center">
              <div className="h-8 w-52 bg-gray-300 rounded"></div>
              <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-6 w-20 bg-gray-300 rounded mt-4"></div>
            <div className="h-3 w-28 bg-gray-200 rounded mt-2"></div>
          </div>
        ))
      ) : (
        cardData.map((card, idx) => (
          <div key={idx} className="transition-all duration-300 ease-in-out transform hover:scale-105">
            <Card {...card} />
          </div>
        ))
      )}
    </section>
  );
}

export default CardContainer;
