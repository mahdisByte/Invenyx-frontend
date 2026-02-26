
import "../styles/UserDashboard.css";

import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "user") navigate("/login");
  }, [role]);

  return <div className="text-center mt-10 text-2xl">User Dashboard</div>;
};

export default UserDashboard;
