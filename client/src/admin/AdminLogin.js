import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('https://checkirpala.onrender.com/api/admin/login', formData);
      if (res.data.success) {
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Panchayat Header */}
      <div className="panchayat-header">
        <h1>গ্রাম পঞ্চায়েত</h1>
        <p>Village Panchayat • গ্রামের রাজনীতি নয়, গ্রামের উন্নয়ন।</p>
      </div>

      {/* Village Leaders Section */}
      <div className="village-leaders">
        <div className="leaders-grid">
          {/* Sarpanch */}
          <div className="leader-card">
            <div className="leader-img">
              <img 
                src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png" 
                alt="Sarpanch"
              />
            </div>
            <h3>सरपंच</h3>
            <p>Sarpanch</p>
          </div>

          {/* Gram Panchayat Emblem */}
          <div className="village-emblem">
            <div className="emblem-icon">🌾</div>
            <div className="emblem-text">Satyameva Jayate</div>
          </div>

          {/* Up-Sarpanch */}
          <div className="leader-card">
            <div className="leader-img">
              <img 
                src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png" 
                alt="Up-Sarpanch"
              />
            </div>
            <h3>উপ-সরপঞ্চ</h3>
            <p>Up-Sarpanch</p>
          </div>
        </div>
      </div>

      {/* Login Box */}
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <p className="subtitle">Irhpala Panchayat</p>
        
        {error && <div className="admin-error">⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="📧 Email / ইমেল"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="🔒 Password / পাসওয়ার্ড"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Please Wait...' : 'Login / লগইন'}
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>🔐 Demo: admin@panchayat.gov.in / admin@123</p>
        </div>
      </div>

      {/* Village Footer */}
      <div className="village-footer">
        <span>🏡</span>গ্রাম পঞ্চায়েত উন্নয়ন বিভাগ<span>🌾</span>
      </div>
    </div>
  );
};

export default AdminLogin;