import React, { useEffect, useState } from 'react';
import FindLostCard from '../Shared/FindLostCard';

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/items');
        const data = await res.json();
        setItems(data);
        setFiltered(data); 
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filteredData = items.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.location.toLowerCase().includes(lower)
    );
    setFiltered(filteredData);
  }, [searchTerm, items]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Lost & Found Items</h2>

      <input
        type="text"
        placeholder="Search by title or location..."
        className="mb-4 px-4 py-2 border rounded w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border p-4 rounded shadow animate-pulse space-y-2">
              <div className="h-40 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-600">No items match your search.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <FindLostCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllItemsPage;
