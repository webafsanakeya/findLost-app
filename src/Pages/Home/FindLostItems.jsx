import React, { useEffect, useState } from 'react';
import FindLostCard from '../Shared/FindLostCard';
import { Link } from 'react-router';


const FindLostItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/items');
        const data = await res.json();

       
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted.slice(0,6));
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
      <div className='mt-10'>
       <Link to='/allItems'> <button className='btn btn-primary text-xl px-6 py-3'>See All Posts</button></Link>
      </div>
    </div>
  );
};

export default FindLostItems;
