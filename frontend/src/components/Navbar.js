import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">
        <Link to={user?.role === "admin" ? "/admin" : "/telecaller"} className="hover:underline">
          CRM Dashboard
        </Link>
      </div>
      <div className="space-x-4 flex items-center">
        {user && (
          <>
            <span className="text-sm">
              Logged in as: <strong>{user.name}</strong> ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;