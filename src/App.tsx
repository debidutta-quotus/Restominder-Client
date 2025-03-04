import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppRoutes from './routes/index';
import { ToastContainer } from 'react-toastify';
import SplashScreenPage from './pages/SplashScreenPage/Index';

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash has been shown in this session
    const splashShown = localStorage.getItem('splashShown');
    
    // If we have a timestamp from this session, don't show splash
    if (splashShown) {
      const timestamp = parseInt(splashShown, 10);
      const now = new Date().getTime();
      
      // If the timestamp is from the current session (less than 24 hours ago)
      // Don't show the splash screen
      if (now - timestamp < 24 * 60 * 60 * 1000) {
        return false;
      }
    }
    
    // Show splash if it hasn't been shown in this session
    return true;
  });

  const handleSplashComplete = () => {
    // Mark splash as shown for this session
    localStorage.setItem('splashShown', new Date().getTime().toString());
    setShowSplash(false);
  };

  // If user manually refreshes the page, we want to reset the splash screen
  useEffect(() => {
    // This will only run on initial page load, not on route changes
    const handleBeforeUnload = () => {
      // Clear the splash shown flag when the user refreshes
      // This ensures splash shows on refresh
      localStorage.removeItem('splashShown');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreenPage onAnimationComplete={handleSplashComplete} />
      ) : (
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;