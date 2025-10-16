import React, { useState, useCallback, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import ScreensaverScreen from './components/ScreensaverScreen';
import Settings from './components/Settings';

/**
 * The root component of the application.
 * It controls which screen is currently active and manages the settings modal.
 */
const App: React.FC = () => {
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  /**
   * Enters fullscreen mode and then activates the screensaver.
   */
  const startScreensaver = useCallback(() => {
    const enterFullscreen = async () => {
      try {
        // Check if fullscreen is enabled and not already active to prevent errors
        if (document.fullscreenEnabled && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
        // Even if fullscreen fails or is already active, proceed to show screensaver
        setIsScreensaverActive(true);
      } catch (err) {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        // Fallback to showing the screensaver without fullscreen if the request fails
        setIsScreensaverActive(true);
      }
    };

    enterFullscreen();
  }, []);

  /**
   * Exits fullscreen mode and deactivates the screensaver.
   */
  const stopScreensaver = useCallback(() => {
    const exitFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
        } finally {
            // Always ensure we deactivate the screensaver state
            setIsScreensaverActive(false);
        }
    };
    
    exitFullscreen();
  }, []);

  // Effect to handle fullscreen changes triggered by the user (e.g., pressing ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      // If the document is no longer in fullscreen, deactivate the screensaver
      if (!document.fullscreenElement) {
        setIsScreensaverActive(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);


  return (
    <>
      {isScreensaverActive ? (
        <ScreensaverScreen onExit={stopScreensaver} />
      ) : (
        <HomeScreen onStart={startScreensaver} onOpenSettings={() => setIsSettingsOpen(true)} />
      )}
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default App;