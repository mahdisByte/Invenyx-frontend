import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/AuditLogPage.css";

const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      const res = await api.get("/AuditLog");
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // 🔍 FILTER LOGIC
  const filteredLogs = logs.filter((log) =>
    log.userName.toLowerCase().includes(search.toLowerCase()) ||
    log.productName?.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="audit-container">
      <h2>Audit Logs</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by user, product, action..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* 📊 TABLE */}
      <table className="audit-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.userName}</td>
                <td className={`action ${log.action.replace(" ", "-").toLowerCase()}`}>
                  {log.action}
                </td>
                <td>{log.productName}</td>
                <td>{log.quantity}</td>
                <td>{new Date(log.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No logs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogPage;
