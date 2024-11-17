import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CarPage from './pages/Car/CarPage';
import CarDetails from './pages/CarDetails/CarDetails';
import HomePage from './pages/Homepage/HomePage';
import ProtectedRoute from './utils/ProtectedRoute';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/mycars" element={<ProtectedRoute element={<CarPage />} />} />
        <Route path="/mycars/:id" element={<ProtectedRoute element={<CarDetails />} />} />
      </Routes>
    </Router>
  );
}

export default App;
