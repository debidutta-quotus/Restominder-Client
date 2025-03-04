import React, { useEffect, useState } from 'react';
import './SplashScreenPage.css';

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

const SplashScreenPage: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate API authentication check (3 seconds)
    const authCheckTimer = setTimeout(() => {
      // Start exit animation after auth check completes
      setIsExiting(true);
      
      // Call the callback after animation completes (0.8s later)
      setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 400);
    }, 800);

    return () => {
      clearTimeout(authCheckTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className={`splash-screen-container ${isExiting ? 'splash-screen-exit' : ''}`}>
      {/* No need for <img> here, as we'll use background-image in CSS */}
    </div>
  );
};

export default SplashScreenPage;