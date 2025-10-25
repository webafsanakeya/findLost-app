import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/logIn" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
