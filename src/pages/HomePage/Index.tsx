import { useState, useEffect } from "react";
import SplashScreenPage from "../SplashScreenPage/Index";
import AuthService from "../../services/AuthService";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // Start authentication check immediately when component mounts
  useEffect(() => {
    AuthService.isAuthenticated().then(authenticated => {
      setIsAuthenticated(authenticated);
      setAuthCheckComplete(true);
    });
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Slight delay before showing content to ensure smooth transition
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <div>
      {showSplash ? (
        <SplashScreenPage onAnimationComplete={handleSplashComplete} />
      ) : (
        <div className={`p-6 transition-all duration-1000 ease-in-out ${contentVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
          {authCheckComplete ? (
            isAuthenticated ? (
              <div className="bg-green-100 p-4 rounded-md transition-all duration-700 ease-in-out delay-300">
                <p className="text-green-800">You are authenticated!</p>
              </div>
            ) : (
              <div className="bg-yellow-100 p-4 rounded-md transition-all duration-700 ease-in-out delay-300">
                <p className="text-yellow-800">You are not authenticated</p>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center mt-8 transition-all duration-700 ease-in-out">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-2">Checking authentication...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );  
};

export default Home;