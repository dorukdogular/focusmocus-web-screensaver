import React, { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { settings, setSettings } = useSettings();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };

  const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-2">{children}</label>
  );

  const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition" />
  );

  const Toggle: React.FC<{ id: string, name: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, children: React.ReactNode }> = ({id, name, checked, onChange, children}) => (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer">
      <span className="text-slate-200">{children}</span>
      <div className="relative">
        <input id={id} name={name} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <div className={`block w-14 h-8 rounded-full transition ${checked ? 'bg-cyan-500' : 'bg-slate-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 text-white animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <fieldset className="border-t border-slate-700 pt-4">
            <legend className="text-lg font-semibold text-cyan-400 mb-2">Pomodoro Timer</legend>
            <div className="space-y-4">
              <Toggle id="pomodoroEnabled" name="pomodoroEnabled" checked={settings.pomodoroEnabled} onChange={handleInputChange}>
                Enable Pomodoro
              </Toggle>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="workMinutes">Work (min)</Label>
                  <Input type="number" id="workMinutes" name="workMinutes" value={settings.workMinutes} onChange={handleInputChange} min="1" />
                </div>
                <div>
                  <Label htmlFor="shortBreakMinutes">Short Break (min)</Label>
                  <Input type="number" id="shortBreakMinutes" name="shortBreakMinutes" value={settings.shortBreakMinutes} onChange={handleInputChange} min="1" />
                </div>
                <div>
                  <Label htmlFor="longBreakMinutes">Long Break (min)</Label>
                  <Input type="number" id="longBreakMinutes" name="longBreakMinutes" value={settings.longBreakMinutes} onChange={handleInputChange} min="1" />
                </div>
              </div>
              <div>
                <Label htmlFor="cyclesBeforeLongBreak">Cycles before long break</Label>
                <Input type="number" id="cyclesBeforeLongBreak" name="cyclesBeforeLongBreak" value={settings.cyclesBeforeLongBreak} onChange={handleInputChange} min="1" />
              </div>
              <Toggle id="autoStartPomodoro" name="autoStartPomodoro" checked={settings.autoStartPomodoro} onChange={handleInputChange}>
                Auto-start with screensaver
              </Toggle>
            </div>
          </fieldset>
          
          <fieldset className="border-t border-slate-700 pt-4">
            <legend className="text-lg font-semibold text-cyan-400 mb-2">Appearance</legend>
            <Toggle id="showSeconds" name="showSeconds" checked={settings.showSeconds} onChange={handleInputChange}>
                Show seconds on clock
              </Toggle>
          </fieldset>
        </div>

      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default Settings;
