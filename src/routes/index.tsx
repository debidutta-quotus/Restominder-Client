import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFoundPage/Index'; 
import Signup from '../pages/AuthPage/signup/Index';
import Login from '../pages/AuthPage/login/Index';
import WelcomePage from '../pages/WelcomePage/Index';
import StoreRegister from '../pages/StoreRegisterPage/Index';
import MenuServices from '../pages/MenuPage/Index';
import Dashboard from '../pages/Dashboard/Index';
import SuccessAnimation from '../pages/SuccessAnimationPage/Index';
import OrdersPage from '../pages/OrdersPage/Index';
import Sidebar from '../components/Sidebar/Index';
import ProtectedRoutes from './ProtectedRoutes';
import AuthRoutes from './AuthRoutes'; // ✅ Import the new wrapper

// ✅ Sidebar Layout
const Layout = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Routes (Wrapped in AuthRoutes) */}
      <Route element={<AuthRoutes />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessAnimation />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/storeregister" element={<StoreRegister />} />
      </Route>

      {/* ✅ Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<MenuServices />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Route>

      {/* Default Redirect & 404 */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
