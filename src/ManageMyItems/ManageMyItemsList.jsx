import React, { use } from "react";
import { Link } from "react-router";

const ManageMyItemsList = ({ itemsCreatedByPromise }) => {
  const items = use(itemsCreatedByPromise);
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Items created by you: {items.length}
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="table-auto w-full text-sm text-left text-gray-600">
          {/* head */}
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4"></th>
              <th className="p-4">Post Type</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Location</th>
              <th className="p-4">Date</th>
              <th className="p-4">Count</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
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
                <td className="p-4">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <Link
                    to={`/recoveries/${item._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    {" "}
                    View Items
                  </Link>{" "}
                </td>
                <td className="p-4 text-center">{item.recovery_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyItemsList;
