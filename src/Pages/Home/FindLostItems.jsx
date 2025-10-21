import React, { useEffect, useState } from "react";
import FindLostCard from "../Shared/FindLostCard";
import { Link } from "react-router";

const FindLostItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("https://find-lost-server-plum.vercel.app/items");
        const data = await res.json();
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="p-6 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4">
        Discover Lost & Found Treasures
      </h2>
      <p className="text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl max-w-3xl mx-auto mb-10">
        Browse the most recent lost and found posts, connect with finders, and help reunite people with their belongings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FindLostCard key={item._id} item={item} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/allItems">
          <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-xl px-8 py-3 rounded-lg shadow-lg hover:scale-105 transform transition">
            See All Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FindLostItems;
