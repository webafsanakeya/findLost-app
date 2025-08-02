import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

const ManageRegistrations = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRegistrations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/registers/organizer/${user.email}`,
          {
            withCredentials: true,
          }
        );
        setRegistrations(res.data);
      } catch (error) {
        console.error("Error loading registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [user?.email]);

  const handleConfirm = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/registered/${id}/confirm`,
        {},
        { withCredentials: true }
      );
      setRegistrations((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, confirmationStatus: "confirmed" } : r
        )
      );
    } catch (err) {
      console.error("Failed to confirm:", err);
    }
  };

  const handleCancel = async (id, isConfirmed, isPaid) => {
    if (isConfirmed && isPaid) return;

    const confirm = window.confirm("Are you sure you want to cancel this registration?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/registered/${id}`, {
        withCredentials: true,
      });
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to cancel:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Camp Registrations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Camp Name</th>
              <th className="p-2">Camp Fees</th>
              <th className="p-2">Participant</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Confirmation</th>
              <th className="p-2">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => {
              const isConfirmed = reg.confirmationStatus === "confirmed";
              const isPaid = reg.paymentStatus === "paid";

              return (
                <tr key={reg._id} className="text-center border-t">
                  <td className="p-2">{reg.campName}</td>
                  <td className="p-2">${reg.fees}</td>
                  <td className="p-2">{reg.participant?.name}</td>
                  <td className="p-2">
                    {isPaid ? "✅ Paid" : "❌ Unpaid"}
                  </td>
                  <td className="p-2">
                    {isConfirmed ? (
                      "✅ Confirmed"
                    ) : (
                      <button
                        onClick={() => handleConfirm(reg._id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      disabled={isConfirmed && isPaid}
                      onClick={() => handleCancel(reg._id, isConfirmed, isPaid)}
                      className={`px-2 py-1 rounded ${
                        isConfirmed && isPaid
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageRegistrations;
