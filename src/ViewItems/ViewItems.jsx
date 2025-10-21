import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

const ViewItems = () => {
  const { item_id } = useParams();
  const initialRecoveries = useLoaderData();

  // Local state to manage dynamic updates
  const [recoveries, setRecoveries] = useState(initialRecoveries || []);

  const handleStatusChange = async (e, recover_id) => {
    const newStatus = e.target.value;

    try {
      const res = await axios.patch(
        `https://find-lost-server-plum.vercel.app/recoveries/${recover_id}`,
        { status: newStatus }
      );

      if (res.data.modifiedCount) {
        // Update local state to reflect new status
        setRecoveries((prev) =>
          prev.map((rec) =>
            rec._id === recover_id ? { ...rec, status: newStatus } : rec
          )
        );

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item status updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (!recoveries || recoveries.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No recoveries found for: {item_id}
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-6">
        {recoveries.length} Items for: {item_id}
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="table-auto w-full text-left text-gray-600">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Location</th>
              <th className="p-3">Recovered Date</th>
              <th className="p-3">Photo</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recoveries.map((recovery, index) => (
              <tr
                key={recovery._id}
                className="hover:bg-base-200 transition-all duration-200"
              >
                <td className="p-3 font-medium">{index + 1}</td>
                <td className="p-3">{recovery.recoveredBy?.name || "Unknown"}</td>
                <td className="p-3">{recovery.recoveredBy?.email || "N/A"}</td>
                <td className="p-3">{recovery.recoveredLocation || "Unknown"}</td>
                <td className="p-3">
                  {recovery.recoveredDate
                    ? moment(recovery.recoveredDate).format("MMMM DD, YYYY")
                    : "N/A"}
                </td>
                <td className="p-3">
                  <img
                    src={recovery.recoveredBy?.photoURL || "https://via.placeholder.com/40"}
                    alt={recovery.recoveredBy?.name || "Recovered By"}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={recovery.status || ""}
                    onChange={(e) => handleStatusChange(e, recovery._id)}
                    className="select select-sm"
                  >
                    <option disabled value="">
                      Update Status
                    </option>
                    <option value="Updated">Updated</option>
                    <option value="Deleted">Deleted</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewItems;
