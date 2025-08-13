import React, { use } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const ManageMyItemsList = ({ itemsCreatedByPromise }) => {
  const items = use(itemsCreatedByPromise);

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://find-lost-server-plum.vercel.app/items/${id}`
        );
        if (res.status === 200) {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
          // Reload page or refresh items (you may need to trigger parent refetch)
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete item", "error");
      }
    }
  };

  if (!items || items.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        You haven’t added any posts yet.
      </p>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Items created by you: {items.length}
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="table-auto w-full text-sm text-left text-gray-600">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Post Type</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Location</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-blue-50 transition duration-200"
              >
                <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {item.postType}
                  </span>
                </td>
                <td className="p-4 font-semibold">{item.title}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.location}</td>
                <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-4 flex gap-2">
                  <Link
                    to={`/updateItem/${item._id}`}
                    className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/recoveries/${item._id}`}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyItemsList;
