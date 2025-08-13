import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const RecoveryModal = ({ itemId, user, onClose }) => {
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const recoveryData = {
      itemId,
      recoveredLocation,
      recoveredDate,
      recoveredBy: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
    };

    try {
      // Check if the item is already recovered
      const itemRes = await axios.get(`https://find-lost-server-plum.vercel.app/items/${itemId}`);
      if (itemRes.data.status === "recovered") {
        Swal.fire("Oops!", "This item is already recovered.", "info");
        setIsSubmitting(false);
        onClose();
        return;
      }

      // Submit recovery info
      const res = await axios.post(
        "https://find-lost-server-plum.vercel.app/recoveries",
        recoveryData
      );

      if (res.data.insertedId) {
        // Update item status to "recovered"
        await axios.patch(
          `https://find-lost-server-plum.vercel.app/items/${itemId}`,
          { status: "recovered" }
        );

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
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
