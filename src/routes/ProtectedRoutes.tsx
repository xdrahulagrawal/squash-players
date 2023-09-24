import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom'

interface RootRouterProps {
    children: ReactNode;
}

const ProtectedRoutes = (props:RootRouterProps) => {
    const auth = localStorage.getItem('auth')
    if (auth) {
        return props.children
    }
    return <Navigate to='/login' />
}

export default ProtectedRoutes