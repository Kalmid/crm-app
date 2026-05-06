import { useEffect, useState } from "react";
import axios from "axios";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/leads", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLeads(res.data);
    };

    fetchLeads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Leads</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.status}</td>
              <td>{lead.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}