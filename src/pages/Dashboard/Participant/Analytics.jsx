import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



const Analytics = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/registers/participant/${user.email}`);
        const formatted = res.data.map(item => ({
          campName: item.campName,
          fees: item.fees,
          participant: item.participant?.name,
        }));
        setData(formatted);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user, axiosSecure]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Registered Camp Analytics</h2>
      {data.length ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fees" fill="#8884d8" name="Camp Fees" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No analytics data available yet.</p>
      )}
    </div>
  );
};

export default Analytics;
