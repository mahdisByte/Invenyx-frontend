import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import SupplierPage from "./pages/SupplierPage";
import ProductPage from "./pages/ProductPage";
import StockInPage from "./pages/StockInPage";
import StockOutPage from "./pages/StockOutPage";
import StockHistoryPage from "./pages/StockHistoryPage";
import DashboardPage from "./pages/DashboardPage";
import AuditLogPage from "./pages/AuditLogPage";

function App() {
  return (
    <>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/product" element={<ProductPage />} />

          {/* Admin Route */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* User Route */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Category Page (Any Logged User) */}
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stock-in"
            element={
              <ProtectedRoute role="admin">
                <StockInPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stock-out"
            element={
              <ProtectedRoute role="admin">
                <StockOutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stock-history"
            element={
              <ProtectedRoute>
                <StockHistoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute>
                <AuditLogPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
