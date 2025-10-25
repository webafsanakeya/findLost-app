import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:scale-105 transform transition">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
