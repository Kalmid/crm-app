import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 shadow">Total: {data.totalLeads}</div>
        <div className="p-4 shadow">New: {data.newLeads}</div>
        <div className="p-4 shadow">Won: {data.wonLeads}</div>
        <div className="p-4 shadow">Lost: {data.lostLeads}</div>
        <div className="p-4 shadow">Total Value: {data.totalValue}</div>
        <div className="p-4 shadow">Won Value: {data.wonValue}</div>
      </div>
    </div>
  );
}
