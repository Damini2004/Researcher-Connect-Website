
'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: true,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isOver: false,
    };
  }

  return timeLeft;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-bold">{String(value).padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider text-white/70">{label}</span>
    </div>
);

export default function ConferenceCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component only renders and runs its logic on the client-side,
    // preventing hydration mismatches between server and client renders.
    setIsClient(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) {
    // Render nothing or a placeholder on the server
    return null;
  }
  
  if (timeLeft.isOver) {
    return <div className="mt-4 font-semibold text-lg bg-green-500/20 text-green-300 px-4 py-2 rounded-md inline-block">The conference has started!</div>;
  }

  return (
    <div className="mt-6">
        <div className="flex items-center gap-4 md:gap-8 bg-black/30 backdrop-blur-sm p-4 rounded-lg w-fit">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <span className="text-3xl font-bold text-white/50">:</span>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <span className="text-3xl font-bold text-white/50">:</span>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <span className="text-3xl font-bold text-white/50">:</span>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
    </div>
  );
}
