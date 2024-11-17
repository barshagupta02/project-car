// src/pages/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');

    axios.post('http://localhost:3001/login', formData)
    .then(response => {
      localStorage.setItem('token', response.data.token);
      navigate('/mycars');
    })
    .catch(error => {
      setError(error.response.data.message);
    })
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-btn">Login</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
