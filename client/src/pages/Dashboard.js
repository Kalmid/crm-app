import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <MainLayout>
        <p>Loading dashboard...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Total Leads</h3>
          <p className="text-2xl font-bold">{data.totalLeads}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">New Leads</h3>
          <p className="text-2xl font-bold">{data.newLeads}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Qualified</h3>
          <p className="text-2xl font-bold">{data.qualifiedLeads}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Won Leads</h3>
          <p className="text-2xl font-bold">{data.wonLeads}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Lost Leads</h3>
          <p className="text-2xl font-bold">{data.lostLeads}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Total Value</h3>
          <p className="text-2xl font-bold">Rs {data.totalValue}</p>
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;