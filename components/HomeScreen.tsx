import React from 'react';

interface HomeScreenProps {
  onStart: () => void;
  onOpenSettings: () => void;
}

/**
 * The initial screen of the application, prompting the user to start the screensaver.
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onOpenSettings }) => {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white text-center p-4 relative overflow-hidden">
      {/* Subtle background image for texture */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=5')] bg-cover bg-center opacity-10"></div>
      
      {/* Settings Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={onOpenSettings}
          aria-label="Open settings"
          className="p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>

      <div className="z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
            FocusMocus
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-lg">
            A futuristic web screensaver with a built-in Pomodoro timer.
        </p>
        <button 
          onClick={onStart}
          className="px-8 py-4 bg-cyan-500 text-slate-900 font-bold text-lg rounded-full 
                     hover:bg-cyan-400 transition-all duration-300 ease-in-out
                     shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)]
                     transform hover:scale-105"
        >
          Start Screensaver
        </button>
      </div>
    </main>
  );
};

export default HomeScreen;
