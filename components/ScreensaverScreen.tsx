import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MOTIVATIONAL_QUOTES } from '../constants';
import Clock from './Clock';
import PomodoroTimer from './PomodoroTimer';
import { useSettings } from '../context/SettingsContext';
import { PomodoroPhase } from '../hooks/usePomodoro';

interface ScreensaverScreenProps {
  onExit: () => void;
}

const ScreensaverScreen: React.FC<ScreensaverScreenProps> = ({ onExit }) => {
  const { settings } = useSettings();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<PomodoroPhase>('idle');

  const getNewQuoteIndex = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    } while (newIndex === quoteIndex);
    return newIndex;
  }, [quoteIndex]);

  useEffect(() => {
    const handleActivity = () => onExit();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [onExit]);

  useEffect(() => {
    const lastQuoteIndex = localStorage.getItem('lastQuoteIndex');
    setQuoteIndex(lastQuoteIndex ? parseInt(lastQuoteIndex, 10) : getNewQuoteIndex());

    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        const newIndex = getNewQuoteIndex();
        setQuoteIndex(newIndex);
        localStorage.setItem('lastQuoteIndex', String(newIndex));
        setIsFading(false);
      }, 500);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [getNewQuoteIndex]);
  
  const backgroundClass = useMemo(() => {
    switch(currentPhase) {
      case 'work':
        return 'from-slate-900 via-black to-blue-900/50';
      case 'shortBreak':
        return 'from-slate-900 via-black to-green-900/50';
      case 'longBreak':
        return 'from-slate-900 via-black to-purple-900/50';
      default:
        return 'from-slate-900 via-black to-slate-800/50';
    }
  }, [currentPhase]);


  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-center p-4 overflow-hidden cursor-none">
      <div className={`absolute inset-0 bg-gradient-to-br animate-slow-pan transition-all duration-1000 ${backgroundClass}`}></div>
      
      <div className="z-10 flex flex-col items-center gap-8">
        {settings.pomodoroEnabled && <PomodoroTimer onPhaseChange={setCurrentPhase} />}
        <Clock />
        <p 
          className={`text-xl md:text-2xl text-gray-300 transition-opacity duration-500 max-w-2xl ${isFading ? 'opacity-0' : 'opacity-100'}`}
          style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
        >
          {MOTIVATIONAL_QUOTES[quoteIndex]}
        </p>
      </div>
    </div>
  );
};

export default ScreensaverScreen;
