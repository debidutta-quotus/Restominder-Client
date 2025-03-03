import { Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage/Index'; // Import your page components
import NotFound from '../pages/NotFoundPage/Index'; 
import Signup from '../pages/AuthPage/signup/Index';
import Login from '../pages/AuthPage/login/Index';
import WelcomePage from '../pages/WelcomePage/Index';
import StoreRegister from '../pages/StoreRegisterPage/Index';
import MenuServices from '../pages/MenuPage/Menu';
import Dashboard from '../pages/Dashboard/Index';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/welcome' element={<WelcomePage/>} />
            <Route path='/storeregister' element={<StoreRegister/>} />
            <Route path='/menuservices' element={<MenuServices/>} />
            <Route path='/login' element={<Login/>} />
            <Route path="*" element={<NotFound />} /> 
            
        </Routes>
    )
}

export default AppRoutes;