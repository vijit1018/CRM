import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      login(res.data.user, res.data.token);
      if (res.data.user.role === "admin") navigate("/dashboard");
      else navigate("/telecaller");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4">
        <h2 className="text-xl font-semibold text-center">CRM Login</h2>
        <input className="w-full border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white py-2">Login</button>
        <p className="text-sm mt-2">
  Don’t have an account?{" "}
  <span
    className="text-blue-600 hover:underline cursor-pointer"
    onClick={() => navigate("/register")}
  >
    Register here
  </span>
</p>

      </form>
    </div>
  );
}

export default Login;