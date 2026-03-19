import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}