import React, { useState } from "react";
import { useLoaderData } from "react-router";
import RecoveryModal from "./RecoveryModal";
import UseAuth from "../../Hooks/UseAuth";

const ItemDetails = () => {
  const { user } = UseAuth();
  const item = useLoaderData();
  const [showModal, setShowModal] = useState(false);

  const handleRecoverySubmit = async (recoveryData) => {
    try {
      const res = await fetch(
        "https://find-lost-server-plum.vercel.app/recoveries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recoveryData),
        }
      );

      if (!res.ok) throw new Error("Failed to submit recovery");

      // Update item status to "recovered"
      await fetch(`https://find-lost-server-plum.vercel.app/items/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "recovered" }),
      });

      alert("Recovery info submitted successfully!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error submitting recovery info");
    }
  };

  const isRecovered = item.status === "recovered";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
      <img
        src={item.image || "/placeholder.jpg"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.jpg";
        }}
        alt={item.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p><strong>Post Type:</strong> {item.postType}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date:</strong> {item.date}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Posted By:</strong> {item.userName}</p>
      <p><strong>Contact Info:</strong> {item.contact}</p>
      <p><strong>Status:</strong> {item.status}</p>

      <button
        onClick={() => setShowModal(true)}
        className={`mt-6 px-6 py-2 font-semibold rounded transition ${
          isRecovered
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={isRecovered}
      >
        {isRecovered
          ? "Already Recovered"
          : item.postType === "Lost"
          ? "Found This!"
          : "This is Mine!"}
      </button>

      {showModal && !isRecovered && (
        <RecoveryModal
          itemId={item._id}
          user={user}
          onClose={() => setShowModal(false)}
          onSubmit={handleRecoverySubmit}
        />
      )}
    </div>
  );
};

export default ItemDetails;
