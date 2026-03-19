import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { token, role, name, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Left side */}
        <div className="flex items-center gap-3">
          {token && (
            <button
              onClick={onMenuClick}
              className="text-white text-xl"
            >
              ☰
            </button>
          )}

          <Link
            to="/"
            className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition"
          >
            Invenyx
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {!token && (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              <span className="text-sm text-gray-400">
                {role === "admin" ? `Admin ${name}` : `Hi, ${name}`}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"
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