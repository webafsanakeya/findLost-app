import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const FindLostCard = ({ item }) => {
  const { _id, title, description, category, location, image, date } = item;
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={image || "/placeholder.jpg"}
        onError={(e)=>{
          e.target.onError = null;
          e.target.src = "/placeholder.jpg"
        }}
        alt={title}
        className="h-40 w-full object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-gray-600 font-bold">{category}</p>
      <p className="text-sm mt-1 text-blue-600 flex items-center gap-2">
        <FaMapMarkerAlt /> {location}
      </p>
      <p className="text-xs text-gray-500">Posted on {date}</p>
      <Link to={`/items/${_id}`}>
        <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default FindLostCard;
