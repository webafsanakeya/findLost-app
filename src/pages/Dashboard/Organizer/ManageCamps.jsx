import CampDataRow from "@/components/Dashboard/TableRows/CampDataRow";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const ManageCamps = () => {
  const { user } = useAuth();
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Move fetchCamps OUTSIDE of useEffect so we can reuse it
  const fetchCamps = async () => {
    setLoading(true); // start loading if called manually
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/camps-by-organizer?email=${encodeURIComponent(user.email)}`,
        {
          withCredentials: true,
        }
      );
      setCamps(res.data);
    } catch (error) {
      console.error("Error fetching camps:", error);
      setCamps([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch once user email is available
  useEffect(() => {
    if (user?.email) {
      fetchCamps();
    }
  }, [user?.email]);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h1 className="text-2xl font-semibold mb-4">Manage My Camps</h1>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                    Camp Image
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                    Camp Name
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                    Location
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                    Date
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                    Available Slots
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                    Delete
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && camps.length > 0 ? (
                  camps.map((camp) => (
                    <CampDataRow key={camp._id} camp={camp} onChange={fetchCamps} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      {loading ? "Loading..." : "No camps found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCamps;
