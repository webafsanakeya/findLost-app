import axios from "axios";
import React from "react";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";

const ViewItems = () => {
  const { item_id } = useParams();
  const recoveries = useLoaderData();

  const handleStatusChange = (e, recover_id) =>{
    console.log(e.target.value, recover_id);

    axios.patch(`http://localhost:3000/recoveries/${recover_id}`, {status: e.target.value})
    .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount){
             Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item Post Status updated",
                        showConfirmButton: false,
                        timer: 1500,
                      });
        }
    })
    .catch(error =>{
        console.log(error);
    })
  }
  return (
    <div>
      <h2 className="text-3xl">
        {recoveries.length} Items for: {item_id}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Recovered Location</th>
              <th>Recovered Date</th>
              <th>Photo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {recoveries.map((recovery) => (
              <tr key={recovery._id}>
                <th>1</th>
                <td>{recovery.recoveredBy.name}</td>
                <td>{recovery.recoveredBy.email}</td>
                <td>{recovery.recoveredLocation}</td>
                <td>{new Date(recovery.recoveredDate).toLocaleDateString()}</td>
                <td>
                  <img
                    src={recovery.recoveredBy.photoURL}
                    alt="Recovered By"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>
                  <select onChange={e =>handleStatusChange(e, recovery._id)} defaultValue={recovery.status} className="select">
                    <option disabled={true}>Update Status</option>
                    <option>Updated</option>
                    <option>Deleted</option>
                    
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
