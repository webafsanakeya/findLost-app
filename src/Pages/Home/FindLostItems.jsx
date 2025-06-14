import React, { useEffect, useState } from 'react';
import FindLostCard from '../Shared/FindLostCard';
import { Link } from 'react-router'; // ❗ check this line below

const FindLostItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/items');
        const data = await res.json();

        // ✅ Sort without slicing
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className='p-4 items-center text-center'>
      <h2 className='text-2xl font-bold m-4'>All Lost & Found Posts</h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {items.map(item => (
          <FindLostCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FindLostItems;
