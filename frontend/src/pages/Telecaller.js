import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Telecaller() {
  const { token, user } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", address: "" });
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [addressEdit, setAddressEdit] = useState("");
  const [statusPopup, setStatusPopup] = useState(null);

  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/api/leads", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:5000/api/leads", newLead, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewLead({ name: "", email: "", phone: "", address: "", status: "Not Connected"});
      fetchLeads();
    } catch (error) {
      console.error('Unable to add New Leads', error);
    }
  };

  
    const handleEdit = async (id) => {
      try {
      await axios.put(`http://localhost:5000/api/leads/${id}/address`, { address: addressEdit }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingLeadId(null);
      fetchLeads();
  } catch (error) {
    console.error('Unable to add New Leads', error); 
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await axios.delete(`http://localhost:5000/api/leads/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchLeads();
      } catch(error){
        console.error("Unable to delete an agent");
      }
      }
  };

  const handleStatusUpdate = async () => {
    const { id, status, response } = statusPopup;
    try {
      await axios.put(`http://localhost:5000/api/leads/${id}/status`, {
        status,
        response,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatusPopup(null);
      fetchLeads();
    }
    catch(error){
      console.error("Unable to update the lead:", error)
    }
  };

  const connectedOptions = ["Discussed", "Callback", "Interested"];
  const notConnectedOptions = ["Busy", "RNR", "Switched Off"];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>

      {/* Add New Lead */}
      <div className="space-x-2">
        {["name", "email", "phone", "address"].map((field) => (
          <input
            key={field}
            className="border p-2"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={newLead[field]}
            onChange={(e) => setNewLead({ ...newLead, [field]: e.target.value })}
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2" onClick={handleAdd}>Add New</button>
      </div>

      {/* Leads Table */}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td className="border p-2">{lead.name}</td>
              <td className="border p-2">{lead.email}</td>
              <td className="border p-2">{lead.phone}</td>
              <td className="border p-2">
                {editingLeadId === lead._id ? (
                  <input
                    className="border p-1"
                    value={addressEdit}
                    onChange={(e) => setAddressEdit(e.target.value)}
                  />
                ) : (
                  lead.address
                )}
              </td>
              <td className="border p-2 space-x-2">
                {editingLeadId === lead._id ? (
                  <button
                    className="bg-green-600 text-white px-2 py-1"
                    onClick={() => handleEdit(lead._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1"
                    onClick={() => {
                      setEditingLeadId(lead._id);
                      setAddressEdit(lead.address);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-600 text-white px-2 py-1"
                  onClick={() => handleDelete(lead._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1"
                  onClick={() =>
                    setStatusPopup({ id: lead._id, status: "", response: "" })
                  }
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Status Popup */}
      {statusPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded space-y-4 w-96">
            <h3 className="text-lg font-semibold">Update Call Status</h3>
            <div className="flex gap-4">
              <button
                className={`px-3 py-1 border ${statusPopup.status === "Connected" ? "bg-green-500 text-white" : ""}`}
                onClick={() => setStatusPopup({ ...statusPopup, status: "Connected", response: connectedOptions[0] })}
              >
                Connected
              </button>
              <button
                className={`px-3 py-1 border ${statusPopup.status === "Not Connected" ? "bg-red-500 text-white" : ""}`}
                onClick={() => setStatusPopup({ ...statusPopup, status: "Not Connected", response: notConnectedOptions[0] })}
              >
                Not Connected
              </button>
            </div>
            {statusPopup.status && (
              <div>
                <label className="block font-medium mb-1">Response:</label>
                <select
                  className="w-full border p-2"
                  value={statusPopup.response}
                  onChange={(e) => setStatusPopup({ ...statusPopup, response: e.target.value })}
                >
                  {(statusPopup.status === "Connected" ? connectedOptions : notConnectedOptions).map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button className="bg-gray-400 text-white px-4 py-2" onClick={() => setStatusPopup(null)}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2" onClick={handleStatusUpdate}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Telecaller;