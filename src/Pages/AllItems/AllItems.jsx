import React, { useEffect, useState } from 'react';
import FindLostCard from '../Shared/FindLostCard'; 

const AllItemsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/items');
        const data = await res.json();

        
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchAllItems();
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-6">All Lost & Found Posts</h2>

      {items.length === 0 ? (
        <p className="text-lg text-gray-500">No posts available.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <FindLostCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllItemsPage;
