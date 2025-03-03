import React, { useEffect, useState } from 'react';
import { Search, Bell, BarChart2, ShoppingBag, Users, Settings } from 'lucide-react';
import './Dashboard.css';
import AuthService from '../../services/AuthService';
import SplashScreenPage from '../SplashScreenPage/Index';

const Dashboard: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Start authentication check immediately when component mounts
  useEffect(() => {
    AuthService.isAuthenticated().then(authenticated => {
      console.log('Authenticated:', authenticated);
    });
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
    {
      showSplash ? (
        <SplashScreenPage onAnimationComplete={handleSplashComplete} />
      ) : (
        <div className="dashboard-page-container">
          {/* Sidebar */}
          <aside className="dashboard-page-sidebar">
            <div className="dashboard-page-logo">
              <BarChart2 className="dashboard-page-logo-icon" />
              <div className="dashboard-page-logo-text">
                <h2>Restominder</h2>
                <p>Restaurant Management System</p>
              </div>
            </div>

            <nav className="dashboard-page-nav">
              <div className="dashboard-page-nav-item dashboard-page-active">
                <BarChart2 size={20} />
                <span>Dashboard</span>
              </div>
              <div className="dashboard-page-nav-item">
                <ShoppingBag size={20} />
                <span>Orders</span>
              </div>
              <div className="dashboard-page-nav-item">
                <Users size={20} />
                <span>Merchants</span>
              </div>
            </nav>

            <div className="dashboard-page-sidebar-footer">
              <div className="dashboard-page-nav-item">
                <Settings size={20} />
                <span>Settings</span>
              </div>
              {/* <button className="dashboard-page-theme-toggle">
                <Moon size={20} />
              </button> */}
            </div>
          </aside>

          {/* Main Content */}
          <main className="dashboard-page-main">
            {/* Header */}
            <header className="dashboard-page-header">
              <div className="dashboard-page-search">
                <input type="text" placeholder="Enter your search request..." />
                <Search className="dashboard-page-search-icon" />
              </div>
              <div className="dashboard-page-header-actions">
                <div className="dashboard-page-time-filter">
                  <span>Last 24 hrs</span>
                </div>
                <button className="dashboard-page-notification">
                  <Bell size={20} />
                </button>
                <div className="dashboard-page-user">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User profile" />
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <div className="dashboard-page-content">
              {/* Top Row */}
              <div className="dashboard-page-row">
                {/* Order Report Card */}
                <div className="dashboard-page-card dashboard-page-order-report">
                  <div className="dashboard-page-card-header">
                    <h2>Order Report</h2>
                    <div className="dashboard-page-card-actions">
                      <select className="dashboard-page-time-filter">
                        <option>Last 24 hrs</option>
                      </select>
                      <div className="dashboard-page-action-buttons">
                        <button className="dashboard-page-icon-button">
                          <span>Share</span>
                        </button>
                        <button className="dashboard-page-icon-button">
                          <span>Print</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-page-chart-container">
                    {/* Chart placeholder */}
                    <div className="dashboard-page-chart-placeholder"></div>
                  </div>
                  <div className="dashboard-page-sales-info">
                    <h3>$ 30,344</h3>
                    <div className="dashboard-page-growth">
                      <span className="dashboard-page-growth-positive">↑ 0.42%</span>
                    </div>
                    <p className="dashboard-page-sales-period">TOTAL SALES BY LAST 24 HRS</p>
                  </div>
                </div>

                {/* Order & Restaurant Summary */}
                <div className="dashboard-page-summary">
                  <h2>Order & Restaurant</h2>
                  
                  <div className="dashboard-page-summary-item">
                    <div className="dashboard-page-summary-icon dashboard-page-blue">
                      <div className="dashboard-page-icon-circle"></div>
                    </div>
                    <div className="dashboard-page-summary-info">
                      <p>Total food orders</p>
                      <p className="dashboard-page-summary-subtext">Daily average: 115</p>
                    </div>
                    <div className="dashboard-page-summary-value dashboard-page-blue-text">3500</div>
                  </div>
                  
                  <div className="dashboard-page-summary-item">
                    <div className="dashboard-page-summary-icon dashboard-page-green">
                      <div className="dashboard-page-icon-circle"></div>
                    </div>
                    <div className="dashboard-page-summary-info">
                      <p>List of restaurants</p>
                      <p className="dashboard-page-summary-subtext">Order now: 95%</p>
                    </div>
                    <div className="dashboard-page-summary-value dashboard-page-green-text">200</div>
                  </div>
                  
                  <div className="dashboard-page-cancelled-orders">
                    <h3>Cancelled Orders</h3>
                    <div className="dashboard-page-progress-bar">
                      <div className="dashboard-page-progress-red"></div>
                      <div className="dashboard-page-progress-green"></div>
                    </div>
                    <div className="dashboard-page-order-stats">
                      <div className="dashboard-page-stat-item">
                        <p className="dashboard-page-stat-percentage dashboard-page-red-text">15%</p>
                        <p className="dashboard-page-stat-change dashboard-page-red-text">↓ 234</p>
                        <p className="dashboard-page-stat-label">Order cancelled</p>
                      </div>
                      <div className="dashboard-page-stat-item">
                        <p className="dashboard-page-stat-percentage dashboard-page-green-text">75%</p>
                        <p className="dashboard-page-stat-change dashboard-page-green-text">↑ 2,345</p>
                        <p className="dashboard-page-stat-label">Order delivered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="dashboard-page-row">
                {/* In-progress Orders */}
                <div className="dashboard-page-card dashboard-page-in-progress">
                  <h2>In-progress Orders</h2>
                  <div className="dashboard-page-progress-container">
                    <div className="dashboard-page-progress-info">
                      <p>less than <span className="dashboard-page-highlight">20%</span> of your sales target will be achieved.</p>
                    </div>
                    <div className="dashboard-page-progress-value">
                      <span>55%</span>
                    </div>
                  </div>
                </div>

                {/* Pending Orders */}
                <div className="dashboard-page-card dashboard-page-pending">
                  <h2>Pending Orders</h2>
                  <div className="dashboard-page-pending-info">
                    <div className="dashboard-page-pending-count">
                      <h3>780</h3>
                      <p>/ 1000</p>
                    </div>
                    <div className="dashboard-page-pending-progress">
                      <div className="dashboard-page-circle-progress">
                        <div className="dashboard-page-progress-text">
                          <span>Total</span>
                          <h3>80%</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="dashboard-page-pending-target">
                    less than <span className="dashboard-page-highlight">20%</span> of your sales target will be achieved.
                  </p>
                </div>

                {/* Order Delivered */}
                <div className="dashboard-page-card dashboard-page-delivered">
                  <div className="dashboard-page-delivered-header">
                    <h2>Order Delivered</h2>
                    <div className="dashboard-page-trend-line"></div>
                  </div>
                  <div className="dashboard-page-delivered-percentage">
                    <h2>95%</h2>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )
    }
    </>
  );
};

export default Dashboard;