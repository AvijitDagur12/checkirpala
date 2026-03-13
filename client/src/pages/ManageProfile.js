import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageProfile.css';

const ManageProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // User details state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    village: '',
    photo: null
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Documents state
  const [documents, setDocuments] = useState([]);
  const [showDocUpload, setShowDocUpload] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    file: null
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
    } else {
      const user = JSON.parse(userData);
      setUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        village: user.village || '',
        photo: null
      });
      fetchUserDocuments(user._id);
    }
  }, [navigate]);

  const fetchUserDocuments = async (userId) => {
    try {
      const res = await fetch(`https://checkirpala.onrender.com/api/user-documents/${userId}`);
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleDocInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoc({ ...newDoc, [name]: value });
  };

  const handleDocFileChange = (e) => {
    setNewDoc({ ...newDoc, file: e.target.files[0] });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('village', formData.village);
      if (formData.photo) data.append('photo', formData.photo);
      data.append('userId', user._id);

      const res = await fetch('https://checkirpala.onrender.com/api/update-profile', {
        method: 'PUT',
        body: data
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Profile updated successfully!');
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
      } else {
        setMessage('Error: ' + result.error);
      }
    } catch (err) {
      setMessage('Operation failed!');
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('https://checkirpala.onrender.com/api/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
      } else {
        setMessage('Error: ' + result.error);
      }
    } catch (err) {
      setMessage('Operation failed!');
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.file) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', newDoc.name);
      data.append('file', newDoc.file);
      data.append('userId', user._id);

      const res = await fetch('https://checkirpala.onrender.com/api/upload-document', {
        method: 'POST',
        body: data
      });

      const result = await res.json();

      if (res.ok) {
        setDocuments([...documents, result.document]);
        setShowDocUpload(false);
        setNewDoc({ name: '', file: null });
      } else {
        setMessage('Error uploading document');
      }
    } catch (err) {
      setMessage('Operation failed!');
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (docId) => {
    if (!window.confirm('Delete this document?')) return;

    try {
      const res = await fetch(`https://checkirpala.onrender.com/api/delete-document/${docId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setDocuments(documents.filter(doc => doc._id !== docId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>Manage Your Profile</h2>

      {message && <div className="message">{message}</div>}

      {/* Profile Details Form */}
      <form onSubmit={updateProfile} className="profile-form">
        <h3>Personal Details</h3>
            <div className="form-group">
            <label>Profile Photo</label> 
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {user.photo && !formData.photo && (
              <img src={`https://checkirpala.onrender.com/uploads/${user.photo}`} alt="Profile" className="profile-preview" />
            )}
          </div>
        {/* Row 1: Name, Email, Phone */}
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} readOnly className="readonly" />
            <small>Name cannot be changed</small>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required readOnly />
            <small>Email cannot be changed</small>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
        </div>

        {/* Row 2: Village, Profile Photo, and Button */}
        
        <div className="form-row">
          <div className="form-group">
            <label>Village</label>
            <input type="text" name="village" value={formData.village} onChange={handleInputChange} required />
          </div>

      

          <div className="form-group button-group">
            <button type="submit" disabled={loading} className="update-btn">
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>
      </form>

      {/* Password Change Section */}
      <div className="password-section">
        <h3>Password</h3>
        {!showPasswordForm ? (
          <button onClick={() => setShowPasswordForm(true)} className="change-password-btn">Change Password</button>
        ) : (
          <form onSubmit={updatePassword} className="password-form">
            <div className="form-row">
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required />
              </div>
            </div>
            <div className="button-group">
              <button type="submit" disabled={loading}>Update Password</button>
              <button type="button" onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      {/* Documents Section */}
      <div className="documents-section">
        <h3>Your Documents</h3>
        
        <div className="documents-list">
          {documents.map(doc => (
            <div key={doc._id} className="document-item">
              <span>{doc.name}</span>
              <div className="doc-actions">
                <a href={`https://checkirpala.onrender.com/uploads/${doc.file}`} target="_blank" rel="noopener noreferrer">View</a>
                <button onClick={() => deleteDocument(doc._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {!showDocUpload ? (
          <button className="add-doc-btn" onClick={() => setShowDocUpload(true)}>+ Add Document</button>
        ) : (
          <form onSubmit={uploadDocument} className="upload-doc-form">
            <div className="form-row">
              <div className="form-group">
                <label>Document Name</label>
                <input type="text" name="name" value={newDoc.name} onChange={handleDocInputChange} required />
              </div>
              <div className="form-group">
                <label>File</label>
                <input type="file" onChange={handleDocFileChange} required />
              </div>
            </div>
            <div className="button-group">
              <button type="submit" disabled={loading}>Upload</button>
              <button type="button" onClick={() => setShowDocUpload(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageProfile;