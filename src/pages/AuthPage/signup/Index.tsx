// src/pages/authentication/signup/Index.tsx
import React, { useState } from "react";
import { TextField } from "@mui/material"; // Only import TextField
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { showErrorToast } from "../../../utils/Toast/Toast";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      console.log("password dnt match");
      showErrorToast("Passwords do not match!"); 
      return;
    }

    console.log("form data", formData);

    navigate("/welcome");
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-org-title">Restominder</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid-container">
            <div className="grid-item">
              <TextField
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{ className: "signup-input" }}
                InputLabelProps={{ className: "signup-label" }}
              />
            </div>
            <div className="grid-item">
              <TextField
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{ className: "signup-input" }}
                InputLabelProps={{ className: "signup-label" }}
              />
            </div>
          </div>

          <div className="form-group">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{ className: "signup-input" }}
              InputLabelProps={{ className: "signup-label" }}
            />
          </div>

          <div className="form-group">
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{ className: "signup-input" }}
              InputLabelProps={{ className: "signup-label" }}
            />
          </div>

          <div className="form-group">
            <TextField
              label="Retype Password"
              type="password"
              name="retypePassword"
              value={formData.retypePassword}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{ className: "signup-input" }}
              InputLabelProps={{ className: "signup-label" }}
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <div className="signup-footer-container">
            <p className="signup-footer-text">
              Have an account?{" "}
              <Link to="/login" className="signup-login-text">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
