import { useEffect, useState } from "react";
import API from "../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StockHistoryPage() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await API.get("/stock");
      setStocks(res.data);
    } catch {
      alert("Error loading stock data");
    }
  };

  // ===== Stats =====
  const totalItems = stocks.length;
  const totalQuantity = stocks.reduce((sum, s) => sum + s.quantity, 0);
  const lowStock = stocks.filter((s) => s.quantity < 10).length;

  // ===== Chart Data =====
  const chartData = stocks.slice(0, 8).map((s) => ({
    name: s.productName,
    stock: s.quantity,
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* ===== Title ===== */}
      <h1 className="text-3xl font-bold text-gray-800">
        Stock Overview
      </h1>

      {/* ===== Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-2xl font-bold">{totalItems}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Quantity</p>
          <h2 className="text-2xl font-bold">{totalQuantity}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Low Stock Items</p>
          <h2 className="text-2xl font-bold text-red-500">
            {lowStock}
          </h2>
        </div>
      </div>

      {/* ===== Chart + Table ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ===== Chart ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Stock Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Table ===== */}
        <div className="bg-white p-6 rounded-xl shadow overflow-auto">
          <h2 className="text-lg font-semibold mb-4">
            Product Stock List
          </h2>

          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Product</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {stocks.map((s) => (
                <tr key={s.productId} className="border-b hover:bg-gray-50">
                  <td className="p-2">{s.productId}</td>
                  <td className="p-2">{s.productName}</td>
                  <td className="p-2 font-semibold">{s.quantity}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.quantity > 20
                          ? "bg-green-100 text-green-600"
                          : s.quantity > 5
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.quantity > 20
                        ? "In Stock"
                        : s.quantity > 5
                        ? "Low"
                        : "Critical"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Insights Section ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Inventory Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>📦 Track all product stock in real-time</div>
          <div>⚠️ Monitor low stock to avoid shortages</div>
          <div>📊 Maintain balanced inventory levels</div>
        </div>
      </div>
    </div>
  );
}

export default StockHistoryPage;