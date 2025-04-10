import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data));
  }, [token]);

  if (!stats) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <StatBox label="Total Telecallers" value={stats.totalTelecallers} />
        <StatBox label="Total Calls Made" value={stats.totalCalls} />
        <StatBox label="Total Customers" value={stats.totalCustomers} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Recent Connected Calls</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Call Date</th>
              <th className="p-2 border">Telecaller</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.connectedLeads.map((lead) => (
              <tr key={lead._id}>
                <td className="border p-2">{lead.name}</td>
                <td className="border p-2">{new Date(lead.callDate).toLocaleString()}</td>
                <td className="border p-2">{lead.createdBy.name}</td>
                <td className="border p-2">{lead.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const StatBox = ({ label, value }) => (
  <div className="p-4 bg-white shadow rounded text-center">
    <h4 className="text-gray-500">{label}</h4>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
