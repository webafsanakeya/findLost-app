import React, { use } from "react";
import ItemRecoveriesRows from "./ItemRecoveriesRows";

const RecoveriesList = ({ myRecoveriesPromise }) => {
  const recoveries = use(myRecoveriesPromise);

  if (!Array.isArray(recoveries)) {
    return <p>Something went wrong loading recoveries.</p>;
  }

  return (
    <div>
      <h3>
        Recovered By: {recoveries[0]?.recoveredBy?.email || "No email found"}
      </h3>
      <h3>Total Recoveries: {recoveries.length}</h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
              ></ItemRecoveriesRows>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecoveriesList;
