import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { token, role, name, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition"
        >
          Invenyx
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {!token && (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <span className="text-sm text-gray-400">
                Hi, {name}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Admin Panel
              </Link>

              <span className="text-sm text-gray-400">
                Admin {name}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
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