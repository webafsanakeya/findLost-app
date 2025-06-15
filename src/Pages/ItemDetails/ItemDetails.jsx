import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import RecoveryModal from "./RecoveryModal";
import UseAuth from "../../Hooks/UseAuth";

const ItemDetails = () => {
  const { id: itemId } = useParams();

  const { user } = UseAuth();

  console.log(itemId, user);

  const item = useLoaderData();

  const [showModal, setShowModal] = useState(false);

  const handleRecoverySubmit = async (recoveryData) => {
    try {
      const res = await fetch("http://localhost:3000/recoveries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recoveryData),
      });

      if (!res.ok) throw new Error("Failed to submit recovery");
      alert("Recovery info submitted successfully!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error submitting recovery info");
    }
  };
  return (
    <div>
      <h2>{item.title}</h2>
      <img
        src={item.image || "/placeholder.jpg"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.jpg";
        }}
        alt={item.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p>
        <strong>Post Type:</strong> {item.postType}
      </p>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Location:</strong> {item.location}
      </p>
      <p>
        <strong>Date:</strong> {item.date}
      </p>
      <p>
        <strong>Description:</strong> {item.description}
      </p>
      <p>
        <strong>Posted By:</strong> {item.userName}
      </p>
      <p>
        <strong>Contact Info:</strong> {item.contact}
      </p>
      <button
        onClick={() => setShowModal(true)}
        className='className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition'
      >
        {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
      </button>
      {showModal && (
        <RecoveryModal
          itemId={item._id.toString()}
          user={user}
          onClose={() => setShowModal(false)}
          onSubmit={handleRecoverySubmit}
        ></RecoveryModal>
      )}
    </div>
  );
};

export default ItemDetails;
