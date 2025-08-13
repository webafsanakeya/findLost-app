import React, { useEffect, useState } from "react";
import FindLostCard from "../Shared/FindLostCard";
import { Link } from "react-router";

const FindLostItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://find-lost-server-plum.vercel.app/items"
        );
        const data = await res.json();

        // Sort by most recent date and take top 6
        const sorted = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setItems(sorted.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="p-6 lg:p-12 text-center">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4">
        Discover Lost & Found Treasures
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 sm:text-lg md:text-xl max-w-3xl mx-auto mb-10">
        Browse the most recent lost and found posts, connect with finders, and help reunite people with their belongings.
      </p>

      {/* Cards Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {items.map((item) => (
          <FindLostCard key={item._id} item={item} />
        ))}
      </div>

      {/* See All Button */}
      <div className="mt-10">
        <Link to="/allItems">
          <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-xl px-8 py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            See All Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FindLostItems;
