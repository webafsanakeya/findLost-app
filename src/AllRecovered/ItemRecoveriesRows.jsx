import React from "react";
import { Link } from "react-router";
import moment from "moment";

const ItemRecoveriesRows = ({ recovery, index }) => {
  const {
    itemName,
    itemCategory,
    itemImage,
    recoveredDate,
    recoveredBy,
    recoveredLocation,
    _id,
    status,
  } = recovery;

  return (
    <tr className="hover:bg-gray-50 transition-all duration-200">
      {/* Index */}
      <th className="p-3">{index + 1}</th>

      {/* Item */}
      <td className="p-3 flex items-center gap-3">
        <div className="w-12 h-12 flex-shrink-0">
          <img
            src={itemImage || "/placeholder.jpg"}
            alt={itemName || "Item"}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div>
          <p className="font-semibold">{itemName || "Unknown Item"}</p>
          <p className="text-sm text-gray-500">{itemCategory || "N/A"}</p>
        </div>
      </td>

      {/* Recovered Date */}
      <td className="p-3">
        <span className="badge badge-info badge-sm">
          {recoveredDate
            ? moment(recoveredDate).format("MMMM DD, YYYY")
            : "N/A"}
        </span>
      </td>

      {/* Recovered By */}
      <td className="p-3 flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0">
          <img
            src={recoveredBy?.photoURL || "/placeholder.jpg"}
            alt={recoveredBy?.name || "Recovered By"}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <p className="font-medium">{recoveredBy?.name || "Unknown"}</p>
          <p className="text-sm text-gray-500">{recoveredBy?.email || "N/A"}</p>
        </div>
      </td>

      {/* Location */}
      <td className="p-3 text-gray-600">{recoveredLocation || "Unknown"}</td>

      {/* Status */}
      <td className="p-3">
        <span
          className={`badge ${
            status === "Updated"
              ? "badge-success"
              : status === "Deleted"
              ? "badge-error"
              : "badge-ghost"
          }`}
        >
          {status || "Pending"}
        </span>
      </td>

      {/* Action */}
      <td className="p-3">
        <Link
          to={`/recoveries/${_id}`}
          className="btn btn-sm btn-outline btn-primary"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default ItemRecoveriesRows;
