import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalApplications: 0,
    pendingApps: 0,
    approvedApps: 0,
    rejectedApps: 0,
    todayApps: 0,
    weeklyApps: 0,
    monthlyApps: 0
  });

  const [reports, setReports] = useState({
    certificatesIssued: 0,
    meetingsHeld: 0,
    complaintsResolved: 0,
    schemesLaunched: 0,
    beneficiaries: 0,
    fundsUtilized: '₹12,50,000'
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin');
    } else {
      setAdmin(JSON.parse(adminData));
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const [appRes] = await Promise.all([
        axios.get('https://checkirpala.onrender.com/api/admin/applications')
      ]);
      
      const apps = appRes.data;
      const today = new Date().toDateString();
      const thisWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - 7);
      
      setStats({
        totalEmployees: 24,
        totalApplications: apps.length,
        pendingApps: apps.filter(app => app.status === 'Pending').length,
        approvedApps: apps.filter(app => app.status === 'Approved').length,
        rejectedApps: apps.filter(app => app.status === 'Rejected').length,
        todayApps: apps.filter(app => new Date(app.appliedDate).toDateString() === today).length,
        weeklyApps: apps.filter(app => new Date(app.appliedDate) >= thisWeek).length,
        monthlyApps: apps.length
      });

      // Mock data for reports
      setReports({
        certificatesIssued: 156,
        meetingsHeld: 8,
        complaintsResolved: 43,
        schemesLaunched: 5,
        beneficiaries: 1234,
        fundsUtilized: '₹12,50,000'
      });

      setRecentActivities([
        { id: 1, action: 'New application submitted', time: '5 mins ago', user: 'Rahul Sharma' },
        { id: 2, action: 'Application approved', time: '2 hours ago', user: 'Priya Singh' },
        { id: 3, action: 'Meeting scheduled', time: '3 hours ago', user: 'Sarpanch' },
        { id: 4, action: 'Complaint resolved', time: '1 day ago', user: 'Gram Sevak' },
      ]);

      setUpcomingMeetings([
        { id: 1, title: 'Gram Sabha Meeting', date: '15 March 2024', time: '11:00 AM' },
        { id: 2, title: 'Health Camp', date: '18 March 2024', time: '10:00 AM' },
        { id: 3, title: 'Scheme Review', date: '20 March 2024', time: '3:00 PM' },
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin');
  };

  if (!admin) return null;

  return (
    <div className="admin-dash">
      {/* Hamburger */}
      <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>☰</button>

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
        
        <div className="admin-profile">
          <div className="admin-avatar">
            {admin.name?.charAt(0).toUpperCase()}
          </div>
          <h3>{admin.name}</h3>
          <p>{admin.email}</p>
          <p className="admin-role">Panchayat Administrator</p>
        </div>

        <div className="admin-menu">
          <button className="active" onClick={() => setSidebarOpen(false)}>
            📊 Main Dashboard
          </button>
          <button onClick={() => { navigate('/admin/AdminApplications'); setSidebarOpen(false); }}>
            📝 Application Approval
          </button>
          <button onClick={() => { navigate('/admin/employees'); setSidebarOpen(false); }}>
            👥 Employee Details
          </button>
          <button onClick={() => { navigate('/admin/reports'); setSidebarOpen(false); }}>
            📈 Panchayat Reports
          </button>
          <button onClick={() => { navigate('/admin/Support'); setSidebarOpen(false); }}>
          Citizen Support
          </button>
          <button onClick={() => { navigate('/admin/meetings'); setSidebarOpen(false); }}>
            📅 Meeting Schedule
          </button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>

        <div className="sidebar-footer">
          <p>Panchayat Portal v1.0</p>
          <p>© 2024 Gram Panchayat</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <h1>Irhpala Panchayat Administration</h1>
          <div className="admin-date">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <span className="stat-icon">📝</span>
            <span className="stat-num">{stats.totalApplications}</span>
            <span>Total Applications</span>
            <small>+{stats.weeklyApps} this week</small>
          </div>
          <div className="stat-card success">
            <span className="stat-icon">✅</span>
            <span className="stat-num">{stats.approvedApps}</span>
            <span>Approved</span>
            <small>{(stats.approvedApps/stats.totalApplications*100 || 0).toFixed(1)}% success rate</small>
          </div>
          <div className="stat-card warning">
            <span className="stat-icon">⏳</span>
            <span className="stat-num">{stats.pendingApps}</span>
            <span>Pending Review</span>
            <small>{stats.todayApps} new today</small>
          </div>
          <div className="stat-card info">
            <span className="stat-icon">👥</span>
            <span className="stat-num">{stats.totalEmployees}</span>
            <span>Active Employees</span>
            <small>8 departments</small>
          </div>
        </div>

        {/* Panchayat Reports Section */}
        <div className="reports-section">
          <h2>Panchayat Performance Report</h2>
          <div className="reports-grid">
            <div className="report-card">
              <div className="report-icon">📜</div>
              <div className="report-content">
                <h3>Certificates Issued</h3>
                <p className="report-number">{reports.certificatesIssued}</p>
                <p className="report-trend">↑ 12% from last month</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">🗓️</div>
              <div className="report-content">
                <h3>Meetings Held</h3>
                <p className="report-number">{reports.meetingsHeld}</p>
                <p className="report-trend">Gram Sabha: 3, Committee: 5</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">⚙️</div>
              <div className="report-content">
                <h3>Complaints Resolved</h3>
                <p className="report-number">{reports.complaintsResolved}</p>
                <p className="report-trend">94% resolution rate</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">🌾</div>
              <div className="report-content">
                <h3>Schemes Launched</h3>
                <p className="report-number">{reports.schemesLaunched}</p>
                <p className="report-trend">Active: 5, Upcoming: 2</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">👨‍👩‍👧‍👦</div>
              <div className="report-content">
                <h3>Beneficiaries</h3>
                <p className="report-number">{reports.beneficiaries}</p>
                <p className="report-trend">Across 8 villages</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">💰</div>
              <div className="report-content">
                <h3>Funds Utilized</h3>
                <p className="report-number">{reports.fundsUtilized}</p>
                <p className="report-trend">FY 2023-24</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="dashboard-two-col">
          {/* Left Column - Recent Activities */}
          <div className="activity-section">
            <h3>📋 Recent Activities</h3>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div className="activity-item" key={activity.id}>
                  <div className="activity-icon">🔔</div>
                  <div className="activity-details">
                    <p>{activity.action}</p>
                    <small>by {activity.user} • {activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Upcoming Meetings */}
          <div className="meeting-section">
            <h3>📅 Upcoming Meetings</h3>
            <div className="meeting-list">
              {upcomingMeetings.map(meeting => (
                <div className="meeting-card" key={meeting.id}>
                  <div className="meeting-date-box">
                    <span className="meeting-day">{meeting.date.split(' ')[0]}</span>
                    <span className="meeting-month">{meeting.date.split(' ')[1]}</span>
                  </div>
                  <div className="meeting-info">
                    <h4>{meeting.title}</h4>
                    <p>⏰ {meeting.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>⚡ Quick Actions</h3>
          <div className="action-buttons">
            <button onClick={() => navigate('/admin/applications')}>
  📝 Review Applications
</button>
            <button onClick={() => navigate('/admin/employees')}>
              👥 Manage Employees
            </button>
            <button onClick={() => navigate('/admin/meetings')}>
              📅 Schedule Meeting
            </button>
            <button onClick={() => navigate('/admin/reports')}>
              📊 Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;