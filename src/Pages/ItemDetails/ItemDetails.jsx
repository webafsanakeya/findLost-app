import React, { useState } from "react";
import { useLoaderData } from "react-router";
import RecoveryModal from "./RecoveryModal";
import UseAuth from "../../Hooks/UseAuth";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ItemDetails = () => {
  const { user } = UseAuth();
  const item = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        {item.title}
      </h2>

      {/* Image with Lightbox */}
      <div
        className="w-full mb-6 cursor-pointer"
        onClick={() => setIsLightboxOpen(true)}
      >
        <img
          src={item.image || "/placeholder.jpg"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
          alt={item.title}
          className="w-full h-auto max-h-[500px] object-contain rounded shadow"
        />
      </div>

      {/* Lightbox */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={[{ src: item.image || "/placeholder.jpg" }]}
      />

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
        <p><strong>Post Type:</strong> {item.postType}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date:</strong> {item.date}</p>
        <p className="sm:col-span-2"><strong>Description:</strong> {item.description}</p>
        <p><strong>Posted By:</strong> {item.userName}</p>
        <p><strong>Contact Info:</strong> {item.contact}</p>
        <p className="sm:col-span-2"><strong>Status:</strong> {item.status}</p>
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-center sm:justify-start">
        <button
          onClick={() => setShowModal(true)}
          className={`px-6 py-2 font-semibold rounded transition w-full sm:w-auto ${
            isRecovered
              ? "bg-gray-400 cursor-not-allowed text-white"
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
      </div>

      {/* Modal */}
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
