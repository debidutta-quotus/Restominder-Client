import { Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage/Index'; // Import your page components
import NotFound from '../pages/NotFoundPage/Index'; 
import Signup from '../pages/AuthPage/signup/Index';
import Login from '../pages/AuthPage/login/Index';
import WelcomePage from '../pages/WelcomePage/Index';
import StoreRegister from '../pages/StoreRegisterPage/Index';
import MenuServices from '../pages/MenuServicePage/MenuService';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
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