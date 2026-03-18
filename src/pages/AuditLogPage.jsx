import React, { useEffect, useState } from "react";
import api from "../utils/api";

const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/AuditLog");
      setLogs(res.data);
    } catch {
      console.error("Error fetching logs");
    }
  };

  // ===== Filter =====
  const filteredLogs = logs.filter((log) =>
    log.userName.toLowerCase().includes(search.toLowerCase()) ||
    log.productName?.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  // ===== Stats =====
  const totalLogs = logs.length;
  const stockInCount = logs.filter(l => l.action.toLowerCase().includes("in")).length;
  const stockOutCount = logs.filter(l => l.action.toLowerCase().includes("out")).length;

  // ===== Badge Color =====
  const getActionStyle = (action) => {
    const a = action.toLowerCase();
    if (a.includes("in")) return "bg-green-100 text-green-700";
    if (a.includes("out")) return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* ===== Title ===== */}
      <h1 className="text-3xl font-bold text-gray-800">
        Audit Logs
      </h1>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Logs</p>
          <h2 className="text-2xl font-bold">{totalLogs}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Stock In</p>
          <h2 className="text-2xl font-bold text-green-600">
            {stockInCount}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Stock Out</p>
          <h2 className="text-2xl font-bold text-red-500">
            {stockOutCount}
          </h2>
        </div>
      </div>

      {/* ===== Search ===== */}
      <div className="bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search by user, product, action..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ===== Table ===== */}
      <div className="bg-white p-6 rounded-xl shadow overflow-auto">
        <h2 className="text-lg font-semibold mb-4">
          Activity Logs
        </h2>

        <table className="w-full text-sm text-center">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2">User</th>
              <th className="p-2">Action</th>
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">
                    {log.userName}
                  </td>

                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionStyle(log.action)}`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td className="p-2">
                    {log.productName || "-"}
                  </td>

                  <td className="p-2">{log.quantity}</td>

                  <td className="p-2 text-gray-600">
                    {new Date(log.date).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Insights ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          System Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>🔍 Track every inventory action</div>
          <div>📦 Monitor stock movement history</div>
          <div>⚠️ Identify unusual activity quickly</div>
        </div>
      </div>

    </div>
  );
};

export default AuditLogPage;