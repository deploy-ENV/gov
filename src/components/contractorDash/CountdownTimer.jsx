import React, { useState, useEffect } from "react";

const CountdownTimer = ({ deadline }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(deadline) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) {
    return <span className="text-red-400">Expired</span>;
  }

  return (
    <span className="text-yellow-400 font-mono">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

export default CountdownTimer;
