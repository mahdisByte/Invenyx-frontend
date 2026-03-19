import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose, role }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">
          Inventory
        </h2>

        <ul className="p-4 space-y-3">

          <li onClick={() => navigate("/dashboard")} className="cursor-pointer">
            Dashboard
          </li>

          <li onClick={() => navigate("/product")} className="cursor-pointer">
            Products
          </li>

          <li onClick={() => navigate("/category")} className="cursor-pointer">
            Categories
          </li>

          <li onClick={() => navigate("/stock-history")} className="cursor-pointer">
            Stock
          </li>

          {role === "admin" && (
            <>
              <li onClick={() => navigate("/supplier")} className="cursor-pointer">
                Suppliers
              </li>

              <li onClick={() => navigate("/stock-in")} className="cursor-pointer">
                Stock In
              </li>

              <li onClick={() => navigate("/stock-out")} className="cursor-pointer">
                Stock Out
              </li>
            </>
          )}

          <li onClick={() => navigate("/audit-logs")} className="cursor-pointer">
            Audit Logs
          </li>
        </ul>
      </div>
    </>
  );
}