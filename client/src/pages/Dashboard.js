import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
    } else {
      const user = JSON.parse(userData);
      setUser(user);
      fetchApplications(user._id);
    }
  }, [navigate]);

  const fetchApplications = async (userId) => {
    try {
      const res = await fetch(`https://checkirpala.onrender.com/api/my-applications/${userId}`);
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===== PDF DOWNLOAD FUNCTION =====
  const handleDownload = async (applicationId) => {
    try {
      const response = await fetch(`https://checkirpala.onrender.com/api/download-certificate/${applicationId}`);

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Download failed');
        return;
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${applicationId}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download certificate');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="dash">
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setSidebarOpen(true)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
        <div className="sidebar-links">
          <Link to="/track-application" onClick={() => setSidebarOpen(false)}>
            Track Your Application
          </Link>

          <Link to="/submit-issue" onClick={() => setSidebarOpen(false)}>
            Submit Any Issue
          </Link>

          <Link to="/manage-profile" onClick={() => setSidebarOpen(false)}>
            Manage Your Profile
          </Link>

          <Link to="/help" onClick={() => setSidebarOpen(false)}>
            Help
          </Link>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Navbar */}
      <div className="dash-nav">
        <div className="nav-left">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <img src="https://iconape.com/wp-content/files/bt/257232/svg/257232.svg" alt="Panchayet Logo" className="nav-logo" />
          <div className="dash-logo">ইরপালা গ্রাম পঞ্চায়েত</div>
        </div>

        <div className="nav-right">
          <div className="dash-user">
            {user.photo ? (
              <img src={`https://checkirpala.onrender.com/uploads/${user.photo}`} alt={user.name} className="dash-user-img" />
            ) : (
              <div className="dash-user-img-placeholder">{user.name?.charAt(0).toUpperCase()}</div>
            )}
            <span className="dash-user-name">{user.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dash-main">
        {/* Apply Button */}
        <div className="dash-actions">
          <button className="apply-btn" onClick={() => navigate('/apply-certificate')}>
            📄 Apply for Certificate +
          </button>
        </div>

        {/* Applications Table */}
        <div className="applications-table">
          <h3>Your Applications Status</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Certificate Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map(app => (
                  <tr key={app._id}>
                    <td>{app.applicantName}</td>
                    <td>{app.mobile}</td>
                    <td>{app.certificateType}</td>
                    <td>
                      <span className={`status-badge ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td>
                      {app.status === 'Approved' ? (
                        <button
                          className="download-btn"
                          onClick={() => handleDownload(app._id)}
                          title="Download Certificate"
                        >
                          ⬇️ Download
                        </button>
                      ) : (
                        <span className="no-download">🔒</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logout Button */}
      <button className="dash-logout" onClick={() => setShowLogoutConfirm(true)}>
        Logout
      </button>

      {/* Logout Popup */}
      {showLogoutConfirm && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <p>Are you sure you want to logout?</p>
            <div className="popup-btns">
              <button className="popup-yes" onClick={handleLogout}>Yes</button>
              <button className="popup-no" onClick={() => setShowLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;