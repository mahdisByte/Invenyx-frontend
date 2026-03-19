import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AuthContext } from "../contexts/AuthContext";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useContext(AuthContext);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        role={role}
      />

      <div className="flex-1">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}