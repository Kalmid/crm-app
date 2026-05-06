import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // form state
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    salesperson: "",
    value: "",
    status: ""
  });

  const token = localStorage.getItem("token");

  // fetch leads
  const fetchLeads = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/api/leads", {
      headers: { Authorization: `Bearer ${token}` }
    });

    setLeads(res.data);
  }, [token]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // CREAT, UPDATE lead
  const createLead = async () => {

    if(editingId) {

      //Update lead
      await axios.put(`http://localhost:5000/api/leads/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}`}
      });

    } else {

      // create lead
      await axios.post("http://localhost:5000/api/leads", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      source: "",
      salesperson: "",
      value: "",
      status: ""
    });

    setEditingId(null);
    fetchLeads();
  };

  // delete lead
  const deleteLead = async (id) => {
    await axios.delete(`http://localhost:5000/api/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchLeads();
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      {/* CREATE FORM */}
      <div className="bg-white p-4 shadow mb-6 grid grid-cols-3 gap-2">
        <input placeholder="Name" className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input placeholder="Company" className="border p-2"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input placeholder="Email" className="border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input placeholder="Phone" className="border p-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input placeholder="Source" className="border p-2"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />

        <input placeholder="Salesperson" className="border p-2"
          value={form.salesperson}
          onChange={(e) => setForm({ ...form, salesperson: e.target.value })}
        />

        <input placeholder="Status" className="border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />

        <input placeholder="Value" className="border p-2"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />

        <button
          onClick={createLead}
          className="bg-blue-500 text-white p-2"
        >
          {editingId ? "Update Lead" : "Add Lead"}
        </button>

      </div>

      <input
        placeholder="Search leads..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white shadow">
        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
              {leads.filter((l) =>
                  l.name.toLowerCase().includes(search.toLowerCase()) ||
                  l.company.toLowerCase().includes(search.toLowerCase())
                )
                .map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="p-2 text-blue-600 cursor-pointer text-center" 
                onClick={() => window.location.href = `/leads/${lead.id}`}>
                  {lead.name}</td>
                <td className="text-center">{lead.company}</td>
                <td className="text-center">
                  <select
                    value={lead.status}
                    onChange={async (e) => {
                      await axios.put(
                        `http://localhost:5000/api/leads/${lead.id}`,
                        { ...lead, status: e.target.value },
                        { headers: { Authorization: `Bearer ${token}` } }
                      );
                      fetchLeads();
                    }}
                    className={`border p-1 text-center ${
                      lead.status === "Won" ? "bg-green-200" :
                      lead.status === "Lost" ? "bg-red-200" :
                      "bg-gray-100"
                    }`}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Proposal Sent</option>
                    <option>Won</option>
                    <option>Lost</option>
                  </select>
                </td>
                <td className="text-center">{lead.value}</td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      setForm(lead);
                      setEditingId(lead.id);
                    }}
                    className="bg-green-500 text-white px-2 py-1"
                  >
                  Edit
                  </button>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>

      </div>

    </MainLayout>
  );
}

export default Leads;