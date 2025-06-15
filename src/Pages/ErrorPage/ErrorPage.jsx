import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <h1 className="text-9xl font-bold text-purple-700">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded shadow-lg transition duration-300">
      Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
