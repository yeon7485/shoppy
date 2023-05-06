import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin }) {
    const { user } = useAuthContext();

    if (!user || (requireAdmin && !user.isAdmin)) {
        // 이동할 때 현재 경로를 history에 보여주고 싶지 않으면 replace={true},생략해서 replace
        return <Navigate to='/' replace />;
    }

    return children;
}
