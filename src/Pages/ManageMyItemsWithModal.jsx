import React, { useState, useEffect } from "react";
import UseAuth from "../Hooks/UseAuth";

const ManageMyItemsWithModal = () => {
  const { user } = UseAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch items created by the logged-in user
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          `https://find-lost-server-plum.vercel.app/items/user/${user.email}`
        );
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [user.email]);

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`https://find-lost-server-plum.vercel.app/items/${id}`, {
          method: "DELETE",
        });
        alert("Item deleted successfully!");
        setItems(items.filter((i) => i._id !== id)); // remove from local state
      } catch (err) {
        console.error(err);
        alert("Failed to delete item.");
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://find-lost-server-plum.vercel.app/items/${selectedItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      alert("Item updated successfully!");
      setShowModal(false);
      // Update local state
      setItems(
        items.map((item) =>
          item._id === selectedItem._id ? { ...formData } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update item.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage My Items</h2>

      <div className="overflow-x-auto rounded shadow border bg-white">
        <table className="w-full text-left text-gray-600">
          <thead className="bg-blue-50 text-blue-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No items found. Try adding new items!
                </td>
              </tr>
            )}
            {items.map((item, index) => (
              <tr key={item._id} className="hover:bg-blue-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.location}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateClick(item)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Item</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Email (read-only)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyItemsWithModal;
