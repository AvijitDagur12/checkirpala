import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin');
    } else {
      setAdmin(JSON.parse(adminData));
      fetchApplications();
    }
  }, [navigate]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('https://checkirpala.onrender.com/api/admin/applications');
      setApplications(res.data);
      setFilteredApps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = applications;
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(app => app.status.toLowerCase() === filter.toLowerCase());
    }
    
    // Apply search
    if (search) {
      filtered = filtered.filter(app => 
        app.applicantName?.toLowerCase().includes(search.toLowerCase()) ||
        app.mobile?.includes(search) ||
        app.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredApps(filtered);
  }, [filter, search, applications]);

  const handleApprove = async () => {
    if (!selectedApp) return;
    
    try {
      await axios.put(`https://checkirpala.onrender.com/api/admin/application/${selectedApp._id}`, { 
        status: 'Approved' 
      });
      fetchApplications();
      setShowConfirm(false);
      setSelectedApp(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      try {
        await axios.put(`https://checkirpala.onrender.com/api/admin/application/${id}`, { 
          status: 'Rejected' 
        });
        fetchApplications();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const ImageModal = ({ image, onClose }) => (
    <div className="image-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <img src={`https://checkirpala.onrender.com/uploads/${image}`} alt="Document" />
      </div>
    </div>
  );

  const ConfirmModal = () => (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h3>Confirm Approval</h3>
        <p>Are you sure you want to approve this application?</p>
        <div className="confirm-buttons">
          <button className="confirm-yes" onClick={handleApprove}>Yes, Approve</button>
          <button className="confirm-no" onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-applications-page">
      {/* Header with Govt Logo */}
      <div className="admin-app-header">
        <div className="header-left">
          <img 
            src="https://scontent.frdp2-1.fna.fbcdn.net/v/t39.30808-1/278840631_319915310275001_2048500184018516228_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=xc-F9Iio-bkQ7kNvwFiJVl0&_nc_oc=AdllsyPOXLsN3_Exbepi0tY8HYDThN-YvmBYWqg94r5GZPFBtB7kb7xOpWtDpDIJl-e6DKUlUjhrNtgdbx8_b4pE&_nc_zt=24&_nc_ht=scontent.frdp2-1.fna&_nc_gid=19QqJInk3FTy_78VOB_08w&_nc_ss=8&oh=00_AfzH6N-KjvPMIMj_sumNHtwYDigriP5ERzBkxaGoPCgEHg&oe=69AF62A9" 
            alt="Govt of India" 
            className="govt-logo"
          />
          <div className="header-title">
            <h1>Irhpala Gram Panchayet</h1>
            <p>Gram Panchayat Administration • Certificate Verification Portal</p>
          </div>
        </div>
        <div className="header-right">
          <div className="admin-badge">
            <span className="badge-icon">👤</span>
            <div className="badge-text">
              <strong>{admin?.name}</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="app-stats-bar">
        <div className="stat-item">
          <span className="stat-value">{applications.length}</span>
          <span className="stat-label">Total Applications</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{applications.filter(a => a.status === 'Pending').length}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{applications.filter(a => a.status === 'Approved').length}</span>
          <span className="stat-label">Approved</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{applications.filter(a => a.status === 'Rejected').length}</span>
          <span className="stat-label">Rejected</span>
        </div>
      </div>

      {/* Filters */}
      <div className="app-filters">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="search-group">
          <input
            type="text"
            placeholder="🔍 Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="applications-table-container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <table className="admin-app-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Applicant Details</th>
                <th>Certificate Type</th>
                <th>Documents</th>
                <th>Contact</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => (
                <tr key={app._id}>
                  <td className="photo-cell">
                    {app.photo ? (
                      <img 
                        src={`https://checkirpala.onrender.com/uploads/${app.photo}`} 
                        alt="Applicant"
                        className="applicant-thumb"
                        onClick={() => setSelectedImage(app.photo)}
                      />
                    ) : (
                      <div className="no-photo">📷</div>
                    )}
                  </td>
                  <td>
                    <strong>{app.applicantName}</strong>
                    <br />
                    <small>S/O: {app.guardianName}</small>
                    <br />
                    <small>{app.relation}</small>
                  </td>
                  <td>
                    <span className="cert-type">{app.certificateType}</span>
                    <br />
                    <small>Income: ₹{app.annualIncome}</small>
                  </td>
                  <td className="docs-cell">
                    <div className="doc-links">
                      {app.doc1File && (
                        <button 
                          className="doc-link"
                          onClick={() => setSelectedImage(app.doc1File)}
                        >
                          📄 Doc 1
                        </button>
                      )}
                      {app.doc2File && (
                        <button 
                          className="doc-link"
                          onClick={() => setSelectedImage(app.doc2File)}
                        >
                          📄 Doc 2
                        </button>
                      )}
                      {app.gsCertificate && (
                        <button 
                          className="doc-link"
                          onClick={() => setSelectedImage(app.gsCertificate)}
                        >
                          📜 GS Cert
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    {app.mobile}
                    <br />
                    <small>{app.email}</small>
                    <br />
                    <small>📍 {app.village}</small>
                  </td>
                  <td>
                    {new Date(app.appliedDate).toLocaleDateString()}
                    <br />
                    <small>{new Date(app.appliedDate).toLocaleTimeString()}</small>
                  </td>
                  <td>
                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {app.status === 'Pending' && (
                      <>
                        <button 
                          className="approve-action"
                          onClick={() => {
                            setSelectedApp(app);
                            setShowConfirm(true);
                          }}
                        >
                          ✅ Approve
                        </button>
                        <button 
                          className="reject-action"
                          onClick={() => handleReject(app._id)}
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    {app.status === 'Approved' && (
                      <span className="approved-text">✓ Verified</span>
                    )}
                    {app.status === 'Rejected' && (
                      <span className="rejected-text">✗ Rejected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}

      {/* Confirm Modal */}
      {showConfirm && <ConfirmModal />}
    </div>
  );
};

export default AdminApplications;