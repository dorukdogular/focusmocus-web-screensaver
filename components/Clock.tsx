import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

/**
 * A component that displays the current time, updating every second.
 */
const Clock: React.FC = () => {
  const { settings } = useSettings();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  /**
   * Formats a Date object into a time string based on settings.
   * @param date - The date object to format.
   * @returns A formatted time string.
   */
  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    if (settings.showSeconds) {
      options.second = '2-digit';
    }
    return date.toLocaleTimeString([], options);
  };

  return (
    <div 
      className="text-7xl md:text-9xl font-mono font-bold text-white tracking-widest" 
      style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
    >
      {formatTime(time)}
    </div>
  );
};

export default Clock;
