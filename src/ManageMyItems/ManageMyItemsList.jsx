import React, { use } from "react";
import { Link } from "react-router";

const ManageMyItemsList = ({ itemsCreatedByPromise }) => {
  const items = use(itemsCreatedByPromise);
  return (
    <div>
      <h2 className="text-2xl">Items created by you: {items.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Post Type</th>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                items.map((item, index) => 
                    <tr key={item._id}>
              <th>{index + 1}</th>
              <td>{item.postType}</td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.location}</td>
              <td>{item.date}</td>
              <td><Link to={`/recoveries/${item._id}`}> View Items</Link> </td>
            </tr>
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyItemsList;
