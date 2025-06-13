import React from "react";
import moment from "moment";

const ItemRecoveriesRows = ({ recovery, index }) => {
  const {
    recoveredLocation,
    recoveredDate,
    itemCategory,
    itemImage,
    recoveredBy,
  } = recovery;

  return (
    <tr className="hover:bg-base-200 transition-all duration-200">
      <th>{index + 1}</th>

      {/* Item Image & Category */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={itemImage} alt="Item" />
            </div>
          </div>
          <div>
            <div className="font-semibold">{itemCategory}</div>
            <div className="text-sm text-gray-500">{recoveredLocation}</div>
          </div>
        </div>
      </td>

      {/* Recovered Date */}
      <td>
        <span className="badge badge-info badge-sm">
          {moment(recoveredDate).format("MMMM DD, YYYY")}
        </span>
      </td>

      {/* Recovered By Info */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-10 h-10">
              <img src={recoveredBy?.photoURL} alt="Recovered By" />
            </div>
          </div>
          <div>
            <div className="font-medium">{recoveredBy?.name}</div>
            <div className="text-sm text-gray-500">{recoveredBy?.email}</div>
          </div>
        </div>
      </td>

      {/* Action */}
      <th>
        <button className="btn btn-sm btn-outline btn-primary">Details</button>
      </th>
    </tr>
  );
};

export default ItemRecoveriesRows;

