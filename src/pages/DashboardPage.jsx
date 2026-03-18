import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/Dashboard.css";

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

  if (!data) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Inventory Dashboard</h1>

      {/* ===== Summary Cards ===== */}
      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Products</h3>
          <p>{data.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Total Categories</h3>
          <p>{data.totalCategories}</p>
        </div>

        <div className="card">
          <h3>Total Stock Quantity</h3>
          <p>{data.totalStockQuantity}</p>
        </div>

        {/* Admin Only Cards */}
        {role === "admin" && (
          <>
            <div className="card">
              <h3>Total Suppliers</h3>
              <p>{data.totalSuppliers}</p>
            </div>

            <div className="card green">
              <h3>Stock In Transactions</h3>
              <p>{data.totalStockInTransactions}</p>
            </div>

            <div className="card red">
              <h3>Stock Out Transactions</h3>
              <p>{data.totalStockOutTransactions}</p>
            </div>
          </>
        )}

      </div>

      {/* ===== Quick Navigation ===== */}
      <div className="dashboard-nav">
        <h2>Quick Access</h2>

        <div className="nav-buttons">

          <button onClick={() => navigate("/product")}>
            Products
          </button>

          <button onClick={() => navigate("/category")}>
            Categories
          </button>

          <button onClick={() => navigate("/stock-history")}>
            Stock Overview
          </button>

          {role === "admin" && (
            <>
              <button onClick={() => navigate("/supplier")}>
                Suppliers
              </button>

              <button onClick={() => navigate("/stock-in")}>
                Stock In
              </button>

              <button onClick={() => navigate("/stock-out")}>
                Stock Out
              </button>
            </>
          )}
          <button onClick={() => navigate("/audit-logs")}>
            Audit logs
          </button>

        </div>
      </div>
    </div>
  );
}

export default DashboardPage;