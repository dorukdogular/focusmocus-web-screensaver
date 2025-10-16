import { useState, useEffect, useCallback, useRef } from 'react';

export type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak' | 'idle';

// A simple function to play a notification sound
const playNotificationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 pitch
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1);
};


export const usePomodoro = (settings: {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
}) => {
  const [phase, setPhase] = useState<PomodoroPhase>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const switchPhase = useCallback(() => {
    playNotificationSound();
    let nextPhase: PomodoroPhase;
    let nextTime: number;
    let newCycleCount = cycleCount;

    if (phase === 'work') {
      newCycleCount++;
      setCycleCount(newCycleCount);
      if (newCycleCount % settings.cyclesBeforeLongBreak === 0) {
        nextPhase = 'longBreak';
        nextTime = settings.longBreakMinutes * 60;
      } else {
        nextPhase = 'shortBreak';
        nextTime = settings.shortBreakMinutes * 60;
      }
    } else { // 'shortBreak' or 'longBreak'
      nextPhase = 'work';
      nextTime = settings.workMinutes * 60;
    }
    setPhase(nextPhase);
    setTimeLeft(nextTime);
  }, [cycleCount, phase, settings]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          switchPhase();
          return 0; // Will be updated by switchPhase
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, switchPhase]);
  
  // Update timer if settings change
  useEffect(() => {
    if(!isActive) {
      setTimeLeft(settings.workMinutes * 60);
      setPhase('idle');
      setCycleCount(0);
    }
  }, [settings, isActive]);


  const startTimer = () => {
    if (phase === 'idle') {
      setPhase('work');
      setTimeLeft(settings.workMinutes * 60);
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setPhase('idle');
    setTimeLeft(settings.workMinutes * 60);
    setCycleCount(0);
  };

  return { phase, timeLeft, isActive, startTimer, pauseTimer, resetTimer, cycleCount };
};
