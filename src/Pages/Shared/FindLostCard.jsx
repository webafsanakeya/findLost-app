import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const FindLostCard = ({ item }) => {
  const { _id, title, description, category, location, image, date, status, price } = item;

  const badgeColor =
    status?.toLowerCase() === "found"
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white"; // Lost vs Found

  return (
    <div className="relative flex flex-col bg-white dark:bg-gray-800 border rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
      
      {/* Status Badge */}
      {status && (
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${badgeColor} z-10`}
        >
          {status}
        </span>
      )}

      {/* Image */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex-1 mb-3 line-clamp-3">
          {description}
        </p>

        <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">{category}</p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Price: ${price?.toFixed(2)}</p>

        <p className="text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
          <FaMapMarkerAlt /> {location}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Posted on {new Date(date).toLocaleDateString()}
        </p>

        <Link to={`/items/${_id}`} className="mt-auto">
          <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg hover:scale-105 transform transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FindLostCard;
