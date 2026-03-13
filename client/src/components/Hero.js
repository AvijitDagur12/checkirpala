import React from "react";
import "./Hero.css";

const Hero = () => {
  // Current date for meeting display
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="hero-wrapper">
      <div className="hero">
        <img
          src="https://plus.unsplash.com/premium_photo-1661962977437-312234a0677d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Village Panchayat"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Irhpala Gram Panchayet Portal</h1>
            <p>গ্রাম পঞ্চায়েতের সেবা ও সনদপত্র এখন অনলাইনে 🌐</p>
            <p className="hero-sub">Village services and certificates made easy</p>
            <button className="hero-btn">Apply for Certificate →</button>
          </div>

          {/* Right Side - News & Updates Panel */}
          <div className="updates-panel">
            <div className="panel-header">
              <h3>📢 Important Updates</h3>
              <span className="date-badge">{formattedDate}</span>
            </div>

            <div className="news-list">
              <div className="news-item">
                <span className="news-tag meeting">🗓️ Meeting</span>
                <p>Gram Sabha Meeting - 15 March 2024 at 11:00 AM</p>
                <small>Main Hall, Panchayat Office</small>
              </div>

              <div className="news-item">
                <span className="news-tag deadline">⏰ Deadline</span>
                <p>Income Certificate Application Last Date: 20 March</p>
                <small>Apply online before deadline</small>
              </div>

              <div className="news-item">
                <span className="news-tag scheme">🌾 Scheme</span>
                <p>PM Kisan Samman Nidhi - 18th Installment Released</p>
                <small>Check your beneficiary status</small>
              </div>

              <div className="news-item">
                <span className="news-tag announcement">📣 Announcement</span>
                <p>New Pension Scheme for Senior Citizens</p>
                <small>Registration starts from 1st April</small>
              </div>
            </div>

            <div className="popular-services">
              <h4>🔥 Popular Services</h4>
              <div className="service-tags">
                <span>Income Certificate</span>
                <span>Residence Certificate</span>
                <span>Caste Certificate</span>
                <span>Birth Certificate</span>
                <span>Death Certificate</span>
                <span>Land Records</span>
              </div>
            </div>

            <div className="meeting-schedule">
              <h4>⏳ Upcoming Meetings</h4>
              <div className="meeting-item">
                <div className="meeting-date">
                  <strong>15</strong>
                  <span>MAR</span>
                </div>
                <div className="meeting-details">
                  <p>Gram Sabha Meeting</p>
                  <small>11:00 AM - Panchayat Hall</small>
                </div>
              </div>
              <div className="meeting-item">
                <div className="meeting-date">
                  <strong>22</strong>
                  <span>MAR</span>
                </div>
                <div className="meeting-details">
                  <p>Health Camp</p>
                  <small>10:00 AM - Primary Health Center</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">15,234+</span>
          <span className="stat-label">Certificates Issued</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">8</span>
          <span className="stat-label">Online Services</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5,678</span>
          <span className="stat-label">Registered Users</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Online Support</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;