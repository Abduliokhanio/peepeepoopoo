import React from 'react';
import { useAuth } from '../context/Auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { user } = useAuth();

  // AUTH BYPASS
  // Uncomment the line below and remove/comment the current return for proper auth
  // return (user ? <Outlet /> : <Navigate to="/auth/signup" />);

  return (<Outlet />);
}