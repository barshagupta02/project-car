// src/components/Header.js
import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/ProtectedRoute';

const Header = () => {
  const isLoggedIn = () => localStorage.getItem('token') !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">MyWebsite</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mycars">My Cars</Link></li>
        </ul>
        {!isLoggedIn() ?
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className='signup-btn'>Register</Link>
          </div>
          :
          <div className="logout-buttons">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        }
      </nav>
    </header>
  );
};

export default Header;
