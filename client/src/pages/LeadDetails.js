import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";

function LeadDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  // fetch lead
  const fetchLead = useCallback(async () => {
    const res = await axios.get(`http://localhost:5000/api/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setLead(res.data);
  }, [id, token]);

  // fetch notes
  const fetchNotes = useCallback(async () => {
    const res = await axios.get(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setNotes(res.data);
  }, [id, token]);

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [fetchLead, fetchNotes]);

  // add note
  const addNote = async () => {
    await axios.post(
      "http://localhost:5000/api/notes",
      { leadId: id, content: note },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setNote("");
    fetchNotes();
  };

  if (!lead) return <MainLayout><p>Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">{lead.name}</h1>

      {/* Lead Info */}
      <div className="bg-white p-4 shadow mb-4">
        <p><b>Company:</b> {lead.company}</p>
        <p><b>Email:</b> {lead.email}</p>
        <p><b>Phone:</b> {lead.phone}</p>
        <p><b>Source:</b> {lead.source}</p>
        <p><b>Salesperson:</b> {lead.salesperson}</p>
        <p><b>Status:</b> {lead.status}</p>
        <p><b>Value:</b> {lead.value}</p>
      </div>

      {/* Add Note */}
      <div className="bg-white p-4 shadow mb-4">
        <textarea
          className="border w-full p-2"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..." />

        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="bg-white p-4 shadow">
        <h2 className="font-bold mb-2">Notes</h2>

        {notes.map((n) => (
          <div key={n.id} className="border-b py-2">
            <p>{n.content}</p>
            <small>By: {n.createdBy}</small>
          </div>
        ))}
      </div>

    </MainLayout>
  );
}


export default LeadDetails;