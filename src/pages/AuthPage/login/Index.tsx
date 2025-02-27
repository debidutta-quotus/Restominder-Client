// src/pages/authentication/login/Login.tsx
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login form data:', formData);
        // Add your login logic here
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-org-title">Restominder</h1>
                <form onSubmit={handleSubmit}>
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
                            InputProps={{ className: 'login-input' }}
                            InputLabelProps={{ className: 'login-label' }}
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
                            InputProps={{ className: 'login-input' }}
                            InputLabelProps={{ className: 'login-label' }}
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>

                    <div className="login-footer-container">
                        <p className="login-footer-text">
                            Don't have an account? <Link to="/signup" className="login-signup-text">Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;