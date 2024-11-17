import React from 'react';
import { Navigate } from 'react-router-dom';

const isLoggedIn = () => localStorage.getItem('token') !== null;

const ProtectedRoute = ({ element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
