'use client';

import React, { useState, useEffect } from 'react';

type CountdownTimerProps = {
  timeLimit: number;          // in minutes (e.g. 25)
  startedAt: string;          // ISO string (e.g. "2025-06-05T09:49:13.811Z")
  onComplete?: () => void;    // optional callback when timer reaches zero
};

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export default function CountdownTimer({
  timeLimit,
  startedAt,
  onComplete,
}: CountdownTimerProps) {
  // 1. Parse the ISO string into a Date
  const startMs = new Date(startedAt).getTime();

  // 2. Compute the end time (ms since epoch)
  const endTimeMs = startMs + timeLimit * 60 * 1000;

  // 3. Local state for "time left" in milliseconds
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const now = Date.now();
    return Math.max(0, endTimeMs - now);
  });

  useEffect(() => {
    // Update immediately, in case time has already advanced
    const update = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTimeMs - now);
      setTimeLeft(remaining);
      if (remaining <= 0 && onComplete) {
        onComplete();
      }
    };

    // Run once right away to set initial value
    update();

    // Then run every 1 second
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, [endTimeMs, onComplete]);

  return (
    <div className="text-sm">
      Remaining Time: <span className="font-mono">{formatTime(timeLeft)}</span>
    </div>
  );
}
