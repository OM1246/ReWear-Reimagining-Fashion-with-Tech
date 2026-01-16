import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

import "./Register.css"; // Import the new CSS file

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.isAdmin) {
        navigate("/admin"); // ✅ Admin goes to admin page
      } else {
        navigate("/dashboard"); // ✅ Normal user goes to dashboard
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Join ReWear</h2>
          <p className="register-subtitle">
            Create your account to start swapping clothes sustainably
          </p>
        </div>

        {error && <div className="register-error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className="register-input password-field"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Admin registration toggle - only for testing purposes */}
          <div className="admin-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                name="isAdmin"
                checked={form.isAdmin}
                onChange={handleChange}
                className="admin-checkbox"
              />
              <span className="toggle-text">
                Register as Admin (Testing only)
              </span>
            </label>
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        <p className="login-prompt">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <div className="eco-badge">
          <span>🌱</span> Join our sustainable fashion community
        </div>
      </div>

    </div>
  );
}
