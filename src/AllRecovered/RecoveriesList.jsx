import React, { useState, use } from "react";
import ItemRecoveriesRows from "./ItemRecoveriesRows";

const RecoveriesList = ({ myRecoveriesPromise }) => {
  const recoveries = use(myRecoveriesPromise);
  const [isTableLayout, setIsTableLayout] = useState(true);  // default to table

  if (!Array.isArray(recoveries)) {
    return <p>Something went wrong loading recoveries.</p>;
  }

  return (
    <div>
      <h3>
        Recovered By: {recoveries[0]?.recoveredBy?.email || "No email found"}
      </h3>
      <h3>Total Recoveries: {recoveries.length}</h3>

      {/* Layout toggle button */}
      <button
        onClick={() => setIsTableLayout(!isTableLayout)}
        className="btn btn-primary my-4"
      >
        {isTableLayout ? "Show Cards" : "Show Table"}
      </button>

      {/* Conditionally render table or cards */}
      {isTableLayout ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Date</th>
                <th>Recovered By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recoveries.map((recovery, index) => (
                <ItemRecoveriesRows
                  key={recovery._id}
                  index={index}
                  recovery={recovery}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recoveries.map((recovery) => (
            <div
              key={recovery._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
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
              <p className="text-gray-600">
                Recovered By: {recovery.recoveredBy?.name || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveriesList;
