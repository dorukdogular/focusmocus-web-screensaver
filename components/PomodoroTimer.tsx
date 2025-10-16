import React, { useEffect, useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';
import { usePomodoro, PomodoroPhase } from '../hooks/usePomodoro';

interface PomodoroTimerProps {
  onPhaseChange: (phase: PomodoroPhase) => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onPhaseChange }) => {
  const { settings } = useSettings();
  const { phase, timeLeft, isActive, startTimer, pauseTimer, resetTimer, cycleCount } = usePomodoro({
    workMinutes: settings.workMinutes,
    shortBreakMinutes: settings.shortBreakMinutes,
    longBreakMinutes: settings.longBreakMinutes,
    cyclesBeforeLongBreak: settings.cyclesBeforeLongBreak,
  });
  
  useEffect(() => {
    if (settings.autoStartPomodoro && phase === 'idle') {
      startTimer();
    }
  }, [settings.autoStartPomodoro, startTimer, phase]);
  
  useEffect(() => {
    onPhaseChange(phase);
  }, [phase, onPhaseChange]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  const totalDuration = useMemo(() => {
    switch(phase) {
      case 'work': return settings.workMinutes * 60;
      case 'shortBreak': return settings.shortBreakMinutes * 60;
      case 'longBreak': return settings.longBreakMinutes * 60;
      default: return settings.workMinutes * 60;
    }
  }, [phase, settings]);

  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
  
  const phaseText = useMemo(() => {
    switch(phase) {
      case 'work': return `Focus #${cycleCount + 1}`;
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Ready to Focus';
    }
  }, [phase, cycleCount]);

  const phaseColor = useMemo(() => {
    switch(phase) {
      case 'work': return 'text-cyan-400';
      case 'shortBreak': return 'text-green-400';
      case 'longBreak': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  }, [phase]);


  return (
    <div className="flex flex-col items-center gap-4 text-white">
      <div className={`text-2xl font-semibold tracking-wider uppercase ${phaseColor}`}>
        {phaseText}
      </div>
      <div className="font-mono text-6xl" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}>
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-4 mt-2">
         {!isActive ? (
          <button onClick={startTimer} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">Start</button>
        ) : (
          <button onClick={pauseTimer} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">Pause</button>
        )}
        <button onClick={resetTimer} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
