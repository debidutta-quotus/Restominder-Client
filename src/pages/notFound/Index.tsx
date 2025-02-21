// NotFound.jsx
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-message">We can't seem to find the page you're looking for.</p>
        <p className="not-found-message">Perhaps you've typed the URL incorrectly, or the page may have been removed.</p>
        <a href="/" className="not-found-go-home-button">Go Home</a>
      </div>
    </div>
  );
};

export default NotFound;