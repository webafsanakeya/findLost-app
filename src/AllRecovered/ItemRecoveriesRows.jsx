import React from "react";
import { Link } from "react-router";
import moment from "moment";

const ItemRecoveriesRows = ({ recovery, index }) => {
  const {
    recoveredLocation,
    recoveredDate,
    itemCategory,
    itemImage,
    recoveredBy,
    _id,
  } = recovery;

  return (
    <tr className="hover:bg-base-200 transition-all duration-200">
      <th>{index + 1}</th>

      {/* Item Image & Category */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={itemImage || "https://via.placeholder.com/150"}
                alt={itemCategory || "Item Image"}
              />
            </div>
          </div>
          <div>
            <div className="font-semibold">{itemCategory || "N/A"}</div>
            <div className="text-sm text-gray-500">{recoveredLocation || "Unknown location"}</div>
          </div>
        </div>
      </td>

      {/* Recovered Date */}
      <td>
        <span className="badge badge-info badge-sm">
          {recoveredDate ? moment(recoveredDate).format("MMMM DD, YYYY") : "N/A"}
        </span>
      </td>

      {/* Recovered By Info */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-10 h-10">
              <img
                src={recoveredBy?.photoURL || "https://via.placeholder.com/40"}
                alt={recoveredBy?.name || "Recovered By"}
              />
            </div>
          </div>
          <div>
            <div className="font-medium">{recoveredBy?.name || "Unknown"}</div>
            <div className="text-sm text-gray-500">{recoveredBy?.email || "N/A"}</div>
          </div>
        </div>
      </td>

      {/* Action */}
      <th>
        <Link
          to={`/recoveries/${_id}`}
          className="btn btn-sm btn-outline btn-primary"
        >
          Details
        </Link>
      </th>
    </tr>
  );
};

export default ItemRecoveriesRows;
