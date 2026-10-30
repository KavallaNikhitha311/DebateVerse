import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CountdownTimer = ({ deadline, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateRemaining(deadline));

  function calculateRemaining(targetDate) {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { total: diff, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateRemaining(deadline);
      setTimeLeft(remaining);

      if (!remaining) {
        clearInterval(interval);
        if (onExpire) onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, onExpire]);

  if (!timeLeft) {
    return (
      <span className="dv-badge-secondary d-inline-flex align-items-center gap-1" style={{ backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 500 }}>
        <Clock size={13} /> Concluded
      </span>
    );
  }

  return (
    <span className="dv-badge-primary d-inline-flex align-items-center gap-1">
      <Clock size={13} />
      <span>
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours > 0 && `${timeLeft.hours}h `}
        {`${timeLeft.minutes}m ${timeLeft.seconds < 10 ? '0' : ''}${timeLeft.seconds}s`} left
      </span>
    </span>
  );
};
