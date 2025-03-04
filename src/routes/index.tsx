import { Routes, Route, Outlet } from 'react-router-dom';
import NotFound from '../pages/NotFoundPage/Index'; 
import Signup from '../pages/AuthPage/signup/Index';
import Login from '../pages/AuthPage/login/Index';
import WelcomePage from '../pages/WelcomePage/Index';
import StoreRegister from '../pages/StoreRegisterPage/Index';
import MenuServices from '../pages/MenuPage/Menu';
import Dashboard from '../pages/Dashboard/Index';
import SuccessAnimation from '../pages/SuccessAnimationPage/Index';
import OrdersPage from '../pages/OrdersPage/Index';
import Sidebar from '../components/Sidebar/Index';

// ✅ Create a Layout component that includes Sidebar
const Layout = () => {
  return (
    <Sidebar>
      <Outlet /> {/* This will render the matched child route */}
    </Sidebar>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Authentication & Public Routes */}
      <Route path='/signup' element={<Signup />} />
      <Route path='/success' element={<SuccessAnimation />} />
      <Route path='/login' element={<Login />} />
      <Route path='/welcome' element={<WelcomePage />} />

      {/* Protected Routes with Sidebar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path='/storeregister' element={<StoreRegister />} />
        <Route path='/menu' element={<MenuServices />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Route>

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
