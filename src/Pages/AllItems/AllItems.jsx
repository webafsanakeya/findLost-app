import React, { useEffect, useState } from 'react';
import FindLostCard from '../Shared/FindLostCard'; 



const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/items');
        const data = await res.json();

        
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted);
        
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } 
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item?.title?.toLowerCase().includes(searchText.toLowerCase()));
  
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-6">All Lost & Found Posts</h2>
      
      <input
        type="text"
        placeholder="Search by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
      />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <FindLostCard key={item._id} item={item}></FindLostCard>
                ))
            ) : (
                <p className="col-span-full text-gray-500">No Items Found</p>
            )}
      </div>
    </div>
  );
};

export default AllItemsPage;
