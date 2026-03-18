import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch {
      alert("Error loading dashboard");
    }
  };

  if (!data) return <div className="loading">Loading...</div>;

  const pieData = [
    { name: "Stock", value: data.totalStockQuantity },
    { name: "Products", value: data.totalProducts },
    { name: "Categories", value: data.totalCategories },
  ];

  const barData = [
    { name: "Products", value: data.totalProducts },
    { name: "Categories", value: data.totalCategories },
    { name: "Stock", value: data.totalStockQuantity },
    ...(role === "admin"
      ? [
          { name: "Suppliers", value: data.totalSuppliers },
          { name: "Stock In", value: data.totalStockInTransactions },
          { name: "Stock Out", value: data.totalStockOutTransactions },
        ]
      : []),
  ];

  return (
    <div className="layout">
      {/* ===== Sidebar ===== */}
      <div className="sidebar">
        <h2 className="logo">Inventory</h2>

        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>

          <li onClick={() => navigate("/product")}>Products</li>

          <li onClick={() => navigate("/category")}>Categories</li>

          <li onClick={() => navigate("/stock-history")}>Stock</li>

          {role === "admin" && (
            <>
              <li onClick={() => navigate("/supplier")}>Suppliers</li>

              <li onClick={() => navigate("/stock-in")}>Stock In</li>

              <li onClick={() => navigate("/stock-out")}>Stock Out</li>
            </>
          )}

          <li onClick={() => navigate("/audit-logs")}>Audit Logs</li>
        </ul>
      </div>

      {/* ===== Main ===== */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h1>Performance Report</h1>
          <div className="user">Admin</div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Products</h3>
            <p>{data.totalProducts}</p>
          </div>

          <div className="card">
            <h3>Total Categories</h3>
            <p>{data.totalCategories}</p>
          </div>

          <div className="card">
            <h3>Total Stock</h3>
            <p>{data.totalStockQuantity}</p>
          </div>

          {role === "admin" && (
            <>
              <div className="card">
                <h3>Suppliers</h3>
                <p>{data.totalSuppliers}</p>
              </div>

              <div className="card green">
                <h3>Stock In</h3>
                <p>{data.totalStockInTransactions}</p>
              </div>

              <div className="card red">
                <h3>Stock Out</h3>
                <p>{data.totalStockOutTransactions}</p>
              </div>
            </>
          )}
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="chart-box">
            <h3>Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90}>
                  {pieData.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;