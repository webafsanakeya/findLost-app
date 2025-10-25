import React, { useState, use } from "react";
import { Link } from "react-router";
import ItemRecoveriesRows from "./ItemRecoveriesRows";

const RecoveriesList = ({ myRecoveriesPromise }) => {
  const recoveries = use(myRecoveriesPromise);

  const [isTableLayout, setIsTableLayout] = useState(true);
  const [sortField, setSortField] = useState("recoveredDate");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!Array.isArray(recoveries)) {
    return (
      <p className="text-center text-red-500 p-4">
        Failed to load recoveries.
      </p>
    );
  }

  if (recoveries.length === 0) {
    return (
      <p className="text-center text-gray-500 p-4">
        You have no recoveries yet.
      </p>
    );
  }

  // Sorting
  const sortedRecoveries = [...recoveries].sort((a, b) => {
    const fieldA = a[sortField] || "";
    const fieldB = b[sortField] || "";
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedRecoveries.length / itemsPerPage);
  const paginatedRecoveries = sortedRecoveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div>
          <button
            onClick={() => setIsTableLayout(!isTableLayout)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition mr-2"
          >
            {isTableLayout ? "Show Cards" : "Show Table"}
          </button>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="px-2 py-1 border rounded mr-2"
          >
            <option value="recoveredDate">Recovered Date</option>
            <option value="itemName">Item Name</option>
            <option value="itemCategory">Category</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-2 py-1 border rounded"
          >
            {sortOrder === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
        <p className="text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
      </div>

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
              {paginatedRecoveries.map((recovery, index) => (
                <ItemRecoveriesRows
                  key={recovery._id}
                  index={(currentPage - 1) * itemsPerPage + index}
                  recovery={recovery}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRecoveries.map((recovery) => (
            <div
              key={recovery._id}
              className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={recovery.itemImage || "/placeholder.jpg"}
                alt={recovery.itemName || "Recovered Item"}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-semibold">{recovery.itemName}</h4>
              <p className="text-gray-600">Category: {recovery.itemCategory}</p>
              <p className="text-gray-600">
                Recovered On: {new Date(recovery.recoveredDate).toLocaleDateString()}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={recovery.recoveredBy?.photoURL || "/placeholder.jpg"}
                  alt={recovery.recoveredBy?.name || "Recovered By"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {recovery.recoveredBy?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {recovery.recoveredBy?.email || "N/A"}
                  </p>
                  <span className="badge badge-success badge-xs mt-1">Recovered</span>
                </div>
              </div>
              <Link
                to={`/recoveries/${recovery._id}`}
                className="mt-auto inline-block text-blue-600 hover:text-blue-800 font-medium underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecoveriesList;
