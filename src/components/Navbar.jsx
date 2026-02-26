import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { token, role, name, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="logo">
          Invenyx
        </Link>

        {/* Right Side */}
        <div className="nav-links">
          {!token && (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="nav-item register-btn">
                Register
              </Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link to="/user-dashboard" className="nav-item">
                Dashboard
              </Link>
              <span className="welcome">Hi, {name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin-dashboard" className="nav-item">
                Admin Panel
              </Link>
              <span className="welcome">Admin {name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
