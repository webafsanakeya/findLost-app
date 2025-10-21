import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const FindLostCard = ({ item }) => {
  const { _id, title, description, category, location, image, date } = item;
  return (
    <div className="border rounded shadow hover:shadow-lg flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 overflow-hidden">
      <img
        src={image || "/placeholder.jpg"}
        onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.jpg"; }}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm flex-1 mt-2">{description}</p>
        <p className="text-sm font-bold mt-1">{category}</p>
        <p className="text-sm mt-1 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <FaMapMarkerAlt /> {location}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Posted on {date}</p>
        <Link to={`/items/${_id}`}>
          <button className="mt-3 px-3 py-2 bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded hover:scale-105 transform transition w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FindLostCard;
