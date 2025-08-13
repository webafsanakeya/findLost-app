import React, { useState, use } from "react";
import { Link } from "react-router";
import ItemRecoveriesRows from "./ItemRecoveriesRows";

const RecoveriesList = ({ myRecoveriesPromise }) => {
  const recoveries = use(myRecoveriesPromise);
  const [isTableLayout, setIsTableLayout] = useState(true);

  if (!Array.isArray(recoveries)) {
    return <p className="text-center text-red-500 p-4">Something went wrong loading recoveries.</p>;
  }

  if (recoveries.length === 0) {
    return <p className="text-center text-gray-500 p-4">No recoveries found.</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <h3 className="text-xl font-semibold mb-2">
        Recovered By: {recoveries[0]?.recoveredBy?.email || "No email found"}
      </h3>
      <h3 className="text-lg mb-4">Total Recoveries: {recoveries.length}</h3>

      <button
        onClick={() => setIsTableLayout(!isTableLayout)}
        className="btn btn-primary my-4 px-4 py-2 rounded"
      >
        {isTableLayout ? "Show Cards" : "Show Table"}
      </button>

      {isTableLayout ? (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
          <table className="table-auto w-full text-left text-gray-600">
            <thead className="bg-blue-50 text-blue-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Item</th>
                <th className="p-3">Date</th>
                <th className="p-3">Recovered By</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {recoveries.map((recovery, index) => (
                <ItemRecoveriesRows key={recovery._id} index={index} recovery={recovery} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recoveries.map((recovery) => (
            <div
              key={recovery._id}
              className="border p-4 rounded shadow hover:shadow-lg transition duration-200"
            >
              <img
                src={recovery.itemImage || "https://via.placeholder.com/150"}
                alt={recovery.itemName || "Item Image"}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-semibold">{recovery.itemName}</h4>
              <p className="text-gray-600">Category: {recovery.itemCategory}</p>
              <p className="text-gray-600">
                Recovered On: {new Date(recovery.recoveredDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Recovered By: {recovery.recoveredBy?.name || "Unknown"}</p>
              <Link
                to={`/recoveries/${recovery._id}`}
                className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveriesList;
