// src/pages/deliveryPartners/WelcomePage/Index.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import welcomeImage from '../../assets/welcome_store.png';
import { showSuccessToast } from '../../utils/Toast/Toast';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    showSuccessToast('Welcome to Restominder');
  }, []);

  const handleRegisterStore = () => {
    navigate('/storeregister');
  };

  const handleSkipClicked = () => {
    navigate('/');
  };

  return (
    <div className="welcome-page-container">
      <div className="welcome-page-content">
        <div className="welcome-page-text-content">
          <h1>The Central Hub for Orders. Restominder!</h1>
          <p>
            1. Connect your store's POS system to multiple delivery partners and manage all your Orders in one place.
          </p>
          <p>
            2. Simplify your operations, Reduce Management Cost, and enhance customer satisfaction.
          </p>

          <div className="welcome-page-button-container">
            <button onClick={handleRegisterStore} className="welcome-page-register-button">
              Register Your Store With Us
            </button>
            <button className="welcome-page-skip-button" onClick={handleSkipClicked}>
              Skip
            </button>
          </div>
        </div>
        <div className="welcome-page-image-content">
          <img src={welcomeImage} alt="Welcome" className="welcome-page-welcome-image" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;