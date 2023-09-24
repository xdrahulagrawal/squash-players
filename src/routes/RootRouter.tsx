import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/index';
import LoginUser from '../pages/login/index';
import RegisterUser from '../pages/register/index';
import ProtectedRoutes from './ProtectedRoutes';


function RootRouter() {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/login' element={<LoginUser />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
    )
}


export default RootRouter