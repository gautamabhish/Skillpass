"use client";
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons';
import Card from '@/components/ui/dashboard/GenCard'
import { AiFillFire } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa6";

interface CardProps {
  title: string,
  number: string,
  subtext: string,
  icon: IconType,
  color: string,
}

const cardData: CardProps[] = [
  {
    title: "Total Points",
    number: "2,450",
    subtext: "+150 this week",
    icon: FaStar,
    color: "yellow",
  },
  {
    title: "Course Completion",
    number: "85%",
    subtext: "Average completion rate",
    icon : FaGraduationCap,
    color: "blue",
  },
  {
    title: "Learning Streak",
    number: "12 Days",
    subtext: "Keep it up!",
    icon: AiFillFire,
    color: "orange,"
  },
  {
    title: "Certificates",
    number: "8",
    subtext: "Earned so far",
    icon : LiaCertificateSolid,
    color : "green",
  },
];

function CardContainer() {
  const [data, setData] = useState<CardProps[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
      setData(cardData);
    }, 2000);
  }, []);
  return (
    <section className="flex flex-col md:flex-row flex-wrap w-full items-center justify-around gap-4 mt-4 px-6 py-2 md:px-16 md:py-4">
      {loaded ? (
        data.map((card, idx) => (
          <div key={idx} className="transition-all duration-300 ease-in-out transform hover:scale-105">
            <Card
              title={card.title}
              number={card.number}
              subtext={card.subtext}
              icon={card.icon}
              color={card.color}
            />
          </div>
        ))
      ) : (
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 w-fit min-w-[300px] animate-pulse flex flex-col gap-2 m-2"
          >
            <div className="flex justify-between items-center">
              <div className="h-8 w-52 bg-gray-300 rounded"></div>
              <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-6 w-20 bg-gray-300 rounded mt-4"></div>
            <div className="h-3 w-28 bg-gray-200 rounded mt-2"></div>
          </div>
        ))
      )}
    </section>
  );
}

export default CardContainer;