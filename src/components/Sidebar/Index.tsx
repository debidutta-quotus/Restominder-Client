import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { Menu, X, Home, Clipboard, ShoppingBag } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  }, [location]);

  return (
    <div className="sidebar-component-container">
      <aside className={`sidebar-component-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-component-header">
          <div className="sidebar-component-logo">
            <span className="sidebar-component-logo-text"> Restominder </span>
          </div>
          {collapsed ? (
            <button className="sidebar-component-mobile-toggle" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
          ) : (
            <button className="sidebar-component-toggle" onClick={toggleSidebar}>
              <X size={20} />
            </button>
          )}
        </div>
        <nav className="sidebar-component-nav">
          <ul className="sidebar-component-nav-item">
            <li>
              <NavLink 
                to="/dashboard" 
                className={({isActive}) => 
                  `sidebar-component-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-component-icon"><Home size={20} /></span>
                <span className="sidebar-component-nav-text">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/menu" 
                className={({isActive}) => 
                  `sidebar-component-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-component-icon"><Clipboard size={20} /></span>
                <span className="sidebar-component-nav-text">Menu Services</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/orders" 
                className={({isActive}) => 
                  `sidebar-component-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-component-icon"><ShoppingBag size={20} /></span>
                <span className="sidebar-component-nav-text">Orders</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink 
                to="/storeregister" 
                className={({isActive}) => 
                  `sidebar-component-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-component-icon"><ShoppingBag size={20} /></span>
                <span className="sidebar-component-nav-text">Store</span>
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </aside>
      <div 
        className={`sidebar-component-overlay ${!collapsed ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>
      <main className={`sidebar-component-main ${collapsed ? 'collapsed' : 'expanded'}`}>
        <div className="sidebar-component-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;