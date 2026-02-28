'use client';

import { useEffect, useState } from 'react';

const DEADLINE = new Date('2026-03-12T23:59:59+06:00').getTime(); // время бишкекское (UTC+6)

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(DEADLINE - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(DEADLINE - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft <= 0) {
    return <div className="text-red-600 font-bold">Регистрация закрыта</div>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="text-sm font-mono bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
      {days}д {hours.toString().padStart(2, '0')}ч {minutes.toString().padStart(2, '0')}м {seconds.toString().padStart(2, '0')}с
    </div>
  );
}