import axios from "axios";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const RecoveryModal = ({ itemId, user, onClose }) => {
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const recoveryData = {
    itemId: recoveredLocation.trim(),
    recoveredLocation: recoveredLocation.trim(),
    recoveredDate: recoveredDate.toISOString(),
    recoveredBy: {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    },
  };

  try {
    const itemRes = await axios.get(`https://find-lost-server-plum.vercel.app/items/${itemId}`);
    if (itemRes.data.status === "recovered") {
      Swal.fire("Oops!", "This item is already recovered.", "info");
      return onClose();
    }

    const res = await axios.post("https://find-lost-server-plum.vercel.app/recoveries", recoveryData);
    console.log("Recovery POST response:", res.data);

    if (res.data && res.data.insertedId) {
      // Try updating item status but don't block recovery success
      try {
        await axios.patch(`https://find-lost-server-plum.vercel.app/items/${itemId}`, { status: "recovered" });
      } catch (err) {
        console.error("Failed to update item status:", err);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Recovery info has been saved!",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    } else {
      throw new Error("Recovery not saved.");
    }
  } catch (error) {
    console.error("Recovery submit failed:", error);
    Swal.fire("Error", "Failed to submit recovery info. Try again.", "error");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full"
      >
        <h3 className="text-xl font-bold mb-4">Submit Recovery Info</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Recovered Location</label>
            <input
              type="text"
              value={recoveredLocation}
              onChange={(e) => setRecoveredLocation(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Where did you give/receive the item?"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Recovered Date</label>
            <DatePicker
              selected={recoveredDate}
              onChange={(date) => setRecoveredDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border rounded px-3 py-2"
              maxDate={new Date()}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Recovered By</label>
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p>{user?.displayName}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryModal;
