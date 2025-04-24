'use client';
import React, { useEffect, useState } from 'react';
import { FaTrophy } from 'react-icons/fa';

const WeeklyChallenge = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Set your challenge end time here (e.g., end of the week - Sunday 11:59 PM)
  const challengeEndTime = new Date();
  challengeEndTime.setDate(challengeEndTime.getDate() + (7 - challengeEndTime.getDay())); // next Sunday
  challengeEndTime.setHours(23, 59, 59, 999);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = challengeEndTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 py-6 text-center">
      <div className="bg-white shadow-lg rounded-xl p-6 min-w-lg mx-auto flex flex-col items-center gap-4 text-center">
        <div className="text-2xl font-bold text-[#1658e7]">Weekly Challenge</div>

        <div className="flex flex-col items-center gap-2">
          <FaTrophy className="text-4xl text-yellow-500" />
          <div className="text-lg font-semibold">Today's Challenge</div>
        </div>

        <div className="flex flex-col items-center text-sm text-gray-600">
          <span className="text-base font-medium mb-1">Time Remaining</span>
          <div className="flex gap-3 font-semibold">
            <div>
              <span className="text-xl">{String(timeLeft.days).padStart(2, '0')}</span> Days
            </div>
            <div>
              <span className="text-xl">{String(timeLeft.hours).padStart(2, '0')}</span> Hours
            </div>
            <div>
              <span className="text-xl">{String(timeLeft.minutes).padStart(2, '0')}</span> Mins
            </div>
          </div>
        </div>

        <button className="mt-4 px-6 py-2 bg-[#1658e7] text-white rounded-md hover:bg-[#1048c7] transition">
          Enter Challenge
        </button>
      </div>
    </div>
  );
};

export default WeeklyChallenge;
