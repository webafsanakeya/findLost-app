import React, { useEffect, useState } from "react";
import FindLostCard from "../Shared/FindLostCard";

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" | "desc"
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("https://find-lost-server-plum.vercel.app/items");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  // Filtering
  const filteredItems = items
    .filter((item) =>
      item?.title?.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) =>
      filterCategory ? item.category === filterCategory : true
    );

  // Sorting by price (or other numeric attribute)
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortOrder) return 0; // no sorting
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  // Get unique categories for filtering
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="p-6 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        All Lost & Found Posts
      </h2>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-64"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-48"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <FindLostCard key={item._id} item={item} />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            No Items Found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllItemsPage;
